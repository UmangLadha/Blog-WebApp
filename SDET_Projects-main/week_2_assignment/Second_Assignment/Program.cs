using System;

namespace Second_Assignment
{
    internal class Program
    {
            public static void Main()
            {
                SmartArray arr = new SmartArray(5);

                arr.Set(0, 10); 
                arr.Set(1, 20);    
                Console.WriteLine("Added some value in array");
                Console.WriteLine("Index 0: " + arr.Get(0)); 
                Console.WriteLine("Index 1: " + arr.Get(1));
                Console.WriteLine("Index 2: " + arr.Get(2));
                
                arr.SetAll(99);
                Console.WriteLine("Array after setAll method");
                Console.WriteLine("Index 0: " + arr.Get(0));
                Console.WriteLine("Index 1: " + arr.Get(1));
                Console.WriteLine("Index 2: " + arr.Get(2));

                arr.Set(2, 50);
                Console.WriteLine("Array after set method");
                Console.WriteLine("Index 0: " + arr.Get(0));
                Console.WriteLine("Index 1: " + arr.Get(2));
                Console.WriteLine("Index 2: " + arr.Get(3));
            }
        }
    }