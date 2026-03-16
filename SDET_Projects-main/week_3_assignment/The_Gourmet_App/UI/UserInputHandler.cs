using System;

namespace The_Gourmet_Spot_App.UI
{
    public class UserInputHandler
    {
        public (string name, int quantity)? ReadIngredientInput()
        {
            Console.Write("Ingredient name: ");
            string? name = Console.ReadLine()?.ToLower();
            if (string.IsNullOrEmpty(name))
            {
                return null;
            }
            ValidateInput validateInput = new ValidateInput();

            int quantity;

            try
            {
                quantity = validateInput.GetValidIntegerInput("Quantity: ", 1);
            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
            return (name, quantity);
        }
    }
}
