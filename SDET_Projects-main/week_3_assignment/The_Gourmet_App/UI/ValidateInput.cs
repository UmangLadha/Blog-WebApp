using System;
using The_Gourmet_Spot_App.Exceptions;

namespace The_Gourmet_Spot_App.UI
{
    class ValidateInput
    {
        public int GetValidIntegerInput(string prompt, int? min = null, int? max = null)
        {
            Console.Write(prompt);

            string input = Console.ReadLine();

            if (int.TryParse(input, out int choice))
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
                throw new ArgumentException(errorMessage);
            }
            else
            {
                throw new FormatException("Invalid Input. Please Enter a Valid number.");
            }
        }
    }
}