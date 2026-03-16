using System;
using System.Collections.Generic;

namespace The_Gourmet_Spot_App
{
    public class OrderHandler
    {
        private const double TaxRate = 0.05;

        UserInputHandler userInputHandler = new UserInputHandler();
        public List<MenuItem> BuildMenu()
        {
            List<MenuItem> menu = new List<MenuItem>();

            MenuItem pizza = new MenuItem("Pizza", 200);
            pizza.Ingredients["onion"] = 2;
            pizza.Ingredients["paneer"] = 2;
            pizza.Ingredients["cheese"] = 3;

            MenuItem burger = new MenuItem("Burger", 150);
            burger.Ingredients["bread"] = 2;
            burger.Ingredients["onion"] = 1;

            menu.Add(pizza);
            menu.Add(burger);

            return menu;
        }

        public (string name, int quantity) ReadIngredientInput()
        {
            Console.Write("Ingredient name: ");
            string name = Console.ReadLine().ToLower();

            int quantity = userInputHandler.GetValidIntegerInput("Quantity: ", 1);
            return (name, quantity);
        }
        public bool ReduceIngredient(MenuItem selected, InventoryManager inventory)
        {
            foreach (var ingredient in selected.Ingredients)
            {
                bool validatingInventory = inventory.ReduceIngredient(ingredient.Key, ingredient.Value);
                if (!validatingInventory) return false;
            }
            inventory.SaveToFile();
            return true;
        }
        public int GetOrderInput(int menuCount)
        {
            int choice = userInputHandler.GetValidIntegerInput("Choose item number: ", 1, menuCount);
            return choice - 1;
        }
        static void PrintMenu(List<MenuItem> menu)
        {
            Console.WriteLine("\n--- Menu ---");
            for (int i = 0; i < menu.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {menu[i].Name} - ₹{menu[i].Price}");
            }
        }
        public void PlaceOrder(List<MenuItem> menu, InventoryManager inventory)
        {
            double total = 0;
            PrintMenu(menu);
            int itemChoice;
            try
            {
                itemChoice = GetOrderInput(menu.Count);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return;
            }
            MenuItem selected = menu[itemChoice];
            bool reduce = ReduceIngredient(selected, inventory);
            if (!reduce)
            {
                Console.WriteLine("Order cancelled.");
                return;
            }
            total += selected.Price;
            double tax = total * TaxRate;
            double grandTotal = total + tax;

            Console.WriteLine($"\nBill: ₹{total}");
            Console.WriteLine($"Tax (5%): ₹{tax}");
            Console.WriteLine($"Total: ₹{grandTotal}");
        }
    }
}