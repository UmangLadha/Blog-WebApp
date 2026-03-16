using System;
using System.Collections.Generic;
using System.IO;
using The_Gourmet_Spot_App;

public class InventoryManager
{
    private Dictionary<string, Ingredient> inventory = new Dictionary<string, Ingredient>();
    private string filePath = "inventory.txt";

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
    public bool ReduceIngredient(string name, int quantity)
    {
        if (!inventory.ContainsKey(name) || inventory[name].Quantity < quantity)
        {
            Console.WriteLine($"Ingredient '{name}' not found or not in stock.");
            return false;
        }
        inventory[name].Quantity -= quantity;
        Console.WriteLine("Inventory ingredient updated.");
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

    public void LoadFromFile()
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Unable to find the File.");
        }

        var lines = File.ReadAllLines(filePath);

        foreach (var line in lines)
        {
            var parts = line.Split(',');
            string name = parts[0];
            int quantity = int.Parse(parts[1]);

            inventory[name] = new Ingredient(name, quantity);
        }
    }

    public void SaveToFile()
    {
        List<string> lines = new List<string>();

        foreach (var item in inventory.Values)
        {
            lines.Add($"{item.Name},{item.Quantity}");
        }

        File.WriteAllLines(filePath, lines);
    }
}
