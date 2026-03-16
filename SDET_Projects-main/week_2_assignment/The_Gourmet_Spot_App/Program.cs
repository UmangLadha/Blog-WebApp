using System;
using System.Collections.Generic;

namespace The_Gourmet_Spot_App
{
    class Program
    {
        static void Main()
        {
            Program MyProgram = new Program();
            OrderHandler MyOrderHandler = new OrderHandler();
            InventoryManager inventory = new InventoryManager();

            try
            {
                inventory.LoadFromFile();
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine("File not found. A new file will be created.");
                inventory.SaveToFile();
            }


            List<MenuItem> menu = MyOrderHandler.BuildMenu();

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
                        MyProgram.AddInventory(inventory);
                        break;

                    case "3":
                        MyProgram.UpdateInventory(inventory);
                        break;

                    case "4":
                        MyOrderHandler.PlaceOrder(menu, inventory);
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
        void AddInventory(InventoryManager inventory)
        {
            var inputHandler = new UserInputHandler();
            var input = inputHandler.GetIngredientInput();

            if (input.HasValue)
            {
                inventory.AddInventory(input.Value.name, input.Value.quantity);
                inventory.SaveToFile();
            }
        }
        void UpdateInventory(InventoryManager inventory)
        {
            var inputHandler = new UserInputHandler();
            var input = inputHandler.GetIngredientInput();

            if (input.HasValue)
            {
                inventory.UpdateInventory(input.Value.name, input.Value.quantity);
                inventory.SaveToFile();
            }
        }
    }
}