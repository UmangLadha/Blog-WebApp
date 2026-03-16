using Daily_Printer.Interfaces;
using System;

namespace Daily_Printer.Models
{
    public class PrinterPaper : IPrintResource
    {
        public int Level { get; private set; } = 20;

        public void Add(int amount)
        {
            if (Level <= 10)
            {
                Level += amount;
                Console.WriteLine($"Added {amount} papers.");
            }
            else
            {
                Console.WriteLine($"Paper count is already sufficient.");
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


