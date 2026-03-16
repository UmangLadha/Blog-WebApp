using Daily_Printer.Interfaces;
using System;

namespace Daily_Printer.Models
{
    public class PrinterInk : IPrintResource
    {
        public int Level { get; private set; } = 100;

        public void Add(int amount)
        {
            if (Level < 100)
            {
                Level += amount;
                Console.WriteLine($"Added {amount} units of ink.");
            }
            else
            {
                Console.WriteLine($"Ink level is already sufficient.");
            }
        }

        public void Consume(int amount)
        {
            if (Level > 0)
            {
                Level -= amount;
            }
        }
    }
}