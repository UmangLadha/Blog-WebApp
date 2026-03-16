using Daily_Printer.Interfaces;
using Daily_Printer.Models;
using Daily_Printer.Services;
using System;

namespace Daily_Printer
{
    class Program
    {
        static void Main()
        {
            PrinterInk Ink = new PrinterInk();
            PrinterPaper Paper = new PrinterPaper();
            Printer Printer = new Printer(Ink, Paper);
            FileHandler printHandler = new FileHandler(Printer);

            while (true)
            {
                Console.WriteLine("\n========Daily Printer========");
                Console.WriteLine($"Ink Level: {Printer.GetInkLevel()}%, Paper Count: {Printer.GetPaperCount()}");
                Console.WriteLine("1. Print File");
                Console.WriteLine("2. Add Ink");
                Console.WriteLine("3. Add Paper");
                Console.WriteLine("4. Exit");
                Console.Write("Select Option: ");
                string selectedOption = Console.ReadLine() ?? "4";

                switch (selectedOption)
                {
                    case "1":
                        printHandler.HandlePrint();
                        break;
                    case "2":
                        Printer.AddInk(10);
                        break;
                    case "3":
                        Printer.AddPaper(5);
                        break;
                    case "4":
                        Console.WriteLine("Closing the Printer..");
                        return;
                    default:
                        Console.WriteLine("Invalid Input");
                        break;
                }
            }
        }
    }
}