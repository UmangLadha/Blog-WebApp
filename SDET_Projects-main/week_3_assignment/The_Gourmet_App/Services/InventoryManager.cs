using System;
using System.Collections.Generic;
using System.IO;
using The_Gourmet_Spot_App.Models;

namespace The_Gourmet_Spot_App.Services
{
    public class InventoryManager
    {
        private Dictionary<string, Ingredient> inventory = new Dictionary<string, Ingredient>();

        private readonly IInventoryStorage _storage;

        public InventoryManager(IInventoryStorage storage)
        {
            _storage = storage;
        }

        public void AddInventory(string name, int quantity)
        {
            if (inventory.ContainsKey(name))
            {
                inventory[name].Quantity += quantity;
            }
            else
            {
                inventory[name] = new Ingredient(name, quantity);
            }
            Console.WriteLine("Inventory Added.");
        }

        public void UpdateInventory(string name, int quantity)
        {
            if (!inventory.ContainsKey(name))
            {
                Console.WriteLine("Ingredient does not exist.");
                return;
            }
            inventory[name].Quantity = quantity;
            Console.WriteLine("Inventory updated.");
        }

        public bool ReduceIngredient(Dictionary<string, int> ingredients)
        {
            foreach (var ingredient in ingredients)
            {
                if (!inventory.ContainsKey(ingredient.Key) || inventory[ingredient.Key].Quantity < ingredient.Value)
                {
                    Console.WriteLine($"Ingredient '{ingredient.Key}' not found or not in stock.");
                    return false;
                }
            }
            foreach (var ingredient in ingredients)
            {
                inventory[ingredient.Key].Quantity -= ingredient.Value;
            }
            Console.WriteLine("Inventory updated for order.");
            return true;
        }

        public void ViewInventory()
        {
            Console.WriteLine("\n--- Inventory ---");

            if (inventory.Count == 0)
            {
                Console.WriteLine("Inventory is empty.");
                return;
            }

            foreach (var item in inventory.Values)
            {
                Console.WriteLine($"{item.Name}: {item.Quantity}");
            }
        }

        public void LoadInventory()
        {
            inventory = _storage.Load();
        }

        public void SaveInventory()
        {
            _storage.Save(inventory);
        }
    }
}
