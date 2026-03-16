using System;
using System.Collections.Generic;
using System.IO;
using static System.IO.Path;
using System.Text.RegularExpressions;

namespace Third_Assignment
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Console.WriteLine("Welcome to the Word Frequency Calculator");

            Console.Write($"Enter the path of an input text file: ");

            string filePath = Console.ReadLine() ?? "";

            if (!File.Exists(filePath))
            {
                Console.WriteLine($"Error: File not found at '{filePath}'");
                return;
            }

            string fileContent;

            try
            {
                fileContent = File.ReadAllText(filePath).ToLower();
            }
            catch (IOException)
            {
                Console.WriteLine("Unable to read the file.");
                return;
            }

            string cleanContent = Regex.Replace(fileContent, "[^a-zA-Z]", " ");
            string[] words = cleanContent.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            Dictionary<string, int> wordCounts = new Dictionary<string, int>();

            foreach (var word in words)
            {
                if (wordCounts.ContainsKey(word))
                {
                    wordCounts[word]++;
                }
                else
                {
                    wordCounts.Add(word, 1);
                }
            }

            var sortedWords = wordCounts.OrderByDescending(x => x.Value).ThenBy(x => x.Key);

            var linesToWrite = new List<string>();

            foreach (var item in sortedWords)
            {
                linesToWrite.Add($"{item.Key}: {item.Value}");
                Console.WriteLine($"{item.Key}: {item.Value}");
            }

            string fileDirectory = Path.GetDirectoryName(filePath) ?? "";
            string fileName = Path.GetFileNameWithoutExtension(filePath);
            string fileExe = Path.GetExtension(filePath);
            string outputFileName = Path.Combine(fileDirectory, $"{fileName}_output{fileExe}") ?? "";

            try
            {
                File.WriteAllLines(outputFileName, linesToWrite);
                Console.WriteLine($"Successfully saved report to: {outputFileName}");
            }
            catch (IOException)
            {
                Console.WriteLine($"Unable to write output file");
            }

        }
    }
}