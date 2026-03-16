using System;

namespace The_Gourmet_Spot_App
{
    public class UserInputHandler
    {
        public (string name, int quantity)? GetIngredientInput()
        {
            try
            {
                OrderHandler MyOrderHandler = new OrderHandler();
                return MyOrderHandler.ReadIngredientInput();
            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public int GetValidIntegerInput(string prompt, int? min = null, int? max = null)
        {
            for (int attempt = 1; attempt <= 3; attempt++)
            {
                Console.Write(prompt);
                if (int.TryParse(Console.ReadLine(), out int choice))
                {
                    if ((!min.HasValue || choice >= min.Value) && (!max.HasValue || choice <= max.Value))
                    {
                        return choice;
                    }

                    string errorMessage = "Invalid input.";
                    if (min.HasValue && max.HasValue)
                    {
                        errorMessage = $"Please enter a number between {min.Value} and {max.Value}.";
                    }
                    Console.WriteLine(errorMessage);
                }
                else
                {
                    Console.WriteLine("Invalid input. Please enter a valid integer.");
                }
                int attemptsRemaining = 3 - attempt;
                if (attemptsRemaining > 0)
                {
                    Console.WriteLine($"You have {attemptsRemaining} attempts remaining.");
                }
            }
            throw new FormatException("Failed to provide a valid number after 3 attempts.");
        }
    }
}
