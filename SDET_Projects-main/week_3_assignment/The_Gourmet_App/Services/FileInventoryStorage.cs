using System;
using System.Collections.Generic;
using System.IO;
using The_Gourmet_Spot_App.Models;
using The_Gourmet_Spot_App.Exceptions;

namespace The_Gourmet_Spot_App.Services
{
    public class FileInventoryStorage : IInventoryStorage
    {
        private readonly string _filePath;

        public FileInventoryStorage(string filePath)
        {
            _filePath = filePath;
        }

        public Dictionary<string, Ingredient> Load()
        {
            var inventory = new Dictionary<string, Ingredient>();

            if (!File.Exists(_filePath))
            {
                throw new FileNotFoundException("Inventory file not found.", _filePath);
            }

            var lines = File.ReadAllLines(_filePath);

            foreach (var line in lines)
            {
                var parts = line.Split(',');
                string name = parts[0];
                int quantity = int.Parse(parts[1]);

                inventory[name] = new Ingredient(name, quantity);
            }

            return inventory;

        }

        public void Save(Dictionary<string, Ingredient> inventory)
        {
            List<string> lines = new List<string>();
            foreach (var item in inventory.Values)
            {
                lines.Add($"{item.Name},{item.Quantity}");
            }
            try
            {
                File.WriteAllLines(_filePath, lines);
            }
            catch (Exception)
            {
                throw new InventoryStorageException("Error saving inventory file.");
            }
        }
    }
}
