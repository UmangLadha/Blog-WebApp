using System;
using System.Collections.Generic;
using System.IO;
using The_Gourmet_Spot_App.Models;
using The_Gourmet_Spot_App.Services;
using The_Gourmet_Spot_App.UI;

namespace The_Gourmet_Spot_App
{
    class Program
    {
        static void Main()
        {
            Menu menu = new Menu();
            List<MenuItem> menuItems = menu.BuildMenu();
            IInventoryStorage storage = new FileInventoryStorage("inventory.txt");
            InventoryManager inventory = new InventoryManager(storage);
            OrderProcessor orderProcessor = new OrderProcessor(inventory);
            UserInputHandler inputHandler = new UserInputHandler();
            InventoryUI inventoryUI = new InventoryUI(inventory, inputHandler);

            InventoryInitializer.Initialize(inventory);

            while (true)
            {
                Console.WriteLine("\n=== The Gourmet Spot ===");
                Console.WriteLine("1. View Inventory");
                Console.WriteLine("2. Add Inventory");
                Console.WriteLine("3. Update Inventory");
                Console.WriteLine("4. Place Order");
                Console.WriteLine("5. Exit");
                Console.Write("Choose option: ");

                string choice = Console.ReadLine() ?? "5";

                switch (choice)
                {
                    case "1":
                        inventory.ViewInventory();
                        break;

                    case "2":
                        inventoryUI.ManageInventoryItem("Add");
                        break;

                    case "3":
                        inventoryUI.ManageInventoryItem("Update");
                        break;

                    case "4":
                        orderProcessor.PlaceOrder(menuItems);
                        break;

                    case "5":
                        Console.WriteLine("Exiting application...");
                        return;

                    default:
                        Console.WriteLine("Invalid choice.");
                        break;
                }
            }
        }
    }
}
