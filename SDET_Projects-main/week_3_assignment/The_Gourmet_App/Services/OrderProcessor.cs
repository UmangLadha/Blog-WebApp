using System;
using The_Gourmet_Spot_App.Exceptions;
using The_Gourmet_Spot_App.Models;
using The_Gourmet_Spot_App.UI;

namespace The_Gourmet_Spot_App.Services
{
    public class OrderProcessor
    {
        private readonly InventoryManager _inventoryManager;

        private const double TAXRATE = 0.05;

        public OrderProcessor(InventoryManager inventoryManager)
        {
            _inventoryManager = inventoryManager;
        }

        public void PlaceOrder(List<MenuItem> menuItems)
        {
            Menu.DisplayMenu(menuItems);
            int itemChoice = GetOrderInput(menuItems.Count);

            if (itemChoice == -1)
            {
                Console.WriteLine("Order cancelled due to invalid input.");
                return;
            }
            MenuItem selected = menuItems[itemChoice];
            bool reduce = _inventoryManager.ReduceIngredient(selected.Ingredients);
            if (!reduce)
            {
                Console.WriteLine("Order cancelled.");
                return;
            }
            GenerateBill(selected);
        }

        public int GetOrderInput(int menuCount)
        {
            ValidateInput validateInput = new ValidateInput();
            int choice=0;
            try
            {
                choice = validateInput.GetValidIntegerInput("Choose a item number: ", 1, menuCount);
            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
            return choice - 1;
        }

        public void GenerateBill(MenuItem selected)
        {
            double total = selected.Price;
            double tax = total * TAXRATE;
            double grandTotal = total + tax;

            Console.WriteLine($"\nBill: ₹{total}");
            Console.WriteLine($"Tax ({TAXRATE * 100}%): ₹{tax}");
            Console.WriteLine($"Total: ₹{grandTotal}");
        }
    }
}
