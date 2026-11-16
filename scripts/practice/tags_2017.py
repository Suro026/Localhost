"""Subject/topic per question for GATE 2017 CS Set 2 (read from the question images). 1-10 = General Aptitude, 11-65 = CS Q.1-55."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS2 = {
    1: (GA, "Verbal Ability: Vocabulary"), 2: (GA, "Verbal Ability: Sentence Completion"),
    3: (GA, "Verbal Reasoning: Logical Deduction"), 4: (GA, "Numerical Ability: Linear Equations"),
    5: (GA, "Numerical Ability: Probability"), 6: (GA, "Verbal Ability: Reading Comprehension"),
    7: (GA, "Verbal Reasoning: Logical Deduction"), 8: (GA, "Numerical Ability: Number System"),
    9: (GA, "Numerical Ability: Roots of Equations"), 10: (GA, "Data Interpretation: Contour Plot"),
    11: (DL, "Number Systems"), 12: (PD, "Memory Allocation and Storage Classes"), 13: (AL, "Time Complexity"),
    14: (TC, "Closure Properties of CFLs"), 15: (CD, "Phases of a Compiler"), 16: (CD, "Parsing"),
    17: (OS, "Threads"), 18: (OS, "File Allocation"), 19: (CN, "Routing Protocols"), 20: (CA, "Integration"),
    21: (D, "Propositional Logic"), 22: (CO, "Floating Point Representation"), 23: (PD, "Linked Lists: Circular Queue"),
    24: (PD, "Pointers"), 25: (AL, "Graph Traversal: BFS"), 26: (TC, "Grammars"), 27: (DB, "ER Model"),
    28: (CN, "Transport Layer: UDP"), 29: (DB, "Referential Integrity"), 30: (CN, "IPv4 Header Options"),
    31: (D, "Partial Orders and Lattices"), 32: (LA, "Matrix Rank"), 33: (D, "Graph Theory"), 34: (DL, "Number Systems"),
    35: (TC, "Minimal DFA"), 36: (PS, "Conditional Probability"), 37: (DL, "Boolean Algebra"), 38: (DL, "K-Maps"),
    39: (CO, "Cache Memory"), 40: (AL, "Recurrence Relations"), 41: (PS, "Probability Generating Functions"),
    42: (CD, "Left Recursion"), 43: (OS, "Deadlock"), 44: (CN, "Error Detection: Hamming Distance"),
    45: (CN, "Transmission and Propagation Delay"), 46: (PD, "Binary Search Trees: Traversal"),
    47: (PD, "Loop Invariants"), 48: (AL, "Time Complexity: Loops"), 49: (TC, "Finite Automata: Epsilon-NFA"),
    50: (TC, "Language Classes"), 51: (TC, "Decidability"), 52: (DL, "Counters"), 53: (PD, "Sorting: Program Output"),
    54: (DB, "Conflict Serializability"), 55: (CO, "Cache: Average Access Time"), 56: (DB, "SQL"),
    57: (D, "Generating Functions"), 58: (PS, "Poisson Distribution"), 59: (DB, "Indexing: B+ Trees"),
    60: (AL, "Huffman Coding"), 61: (OS, "CPU Scheduling"), 62: (LA, "Eigenvalues"), 63: (CO, "Cache: Tag Bits"),
    64: (PD, "Increment and Decrement Operators"), 65: (PD, "Pointers and Strings"),
}

VA, NA = "Verbal Ability", "Numerical Ability"
# GATE 2017 CS Set 1 (no key in the supplied PDF). 1-10 = General Aptitude, 11-65 = CS Q.1-55
CS1 = {
    1: (GA, VA), 2: (GA, VA), 3: (GA, "Logical Reasoning: Seating Arrangements"), 4: (GA, NA), 5: (GA, "Numerical Ability: Probability"),
    6: (GA, "Verbal Reasoning: Inference"), 7: (GA, "Logical Reasoning: Seating Arrangements"), 8: (GA, NA), 9: (GA, "Numerical Ability: Counting"),
    10: (GA, "Data Interpretation: Contour Plot"),
    11: (D, "Propositional Logic"), 12: (D, "Predicate Logic"), 13: (LA, "Systems of Linear Equations"), 14: (AL, "Asymptotic Notation"),
    15: (AL, "Algorithm Design Paradigms"), 16: (PD, "Binary Search Trees"), 17: (DL, "Fixed-Point Representation"), 18: (PD, "Linked Lists in C"),
    19: (DL, "Adders and Overflow"), 20: (TC, "Context-Free Grammars"), 21: (CO, "Addressing Modes"), 22: (CD, "Static Single Assignment"),
    23: (PD, "Dynamic Memory in C"), 24: (CN, "TCP Connection States"), 25: (CN, "Network Security: Digital Signatures"),
    26: (DB, "Functional Dependencies"), 27: (CD, "FOLLOW Sets"), 28: (OS, "Threads"), 29: (PS, "Random Variables"), 30: (D, "Graph Theory: Trees"),
    31: (DL, "Karnaugh Maps"), 32: (TC, "DFA Minimization"), 33: (DB, "SQL"), 34: (OS, "CPU Scheduling"), 35: (CO, "Cache Memory"),
    36: (AL, "Minimum Spanning Trees and Shortest Paths"), 37: (OS, "Deadlock"), 38: (CA, "Limits"), 39: (D, "Propositional Logic"),
    40: (LA, "Vectors"), 41: (LA, "Eigenvalues"), 42: (CN, "Error Detection: CRC"), 43: (DL, "Sequential Circuits: Flip-Flops"),
    44: (TC, "Context-Free Grammars"), 45: (PD, "Recursion"), 46: (PD, "Recursion"), 47: (TC, "Context-Free Languages"),
    48: (TC, "Closure Properties"), 49: (TC, "Computability"), 50: (OS, "Page Replacement: Belady's Anomaly"),
    51: (DB, "Tuple Relational Calculus"), 52: (DB, "Deadlock Handling in Transactions"), 53: (PD, "Control Flow Paths"),
    54: (CN, "Network Security: RSA"), 55: (CN, "Stop-and-Wait Protocol"), 56: (DB, "Relational Algebra: Division"),
    57: (D, "Counting: Inclusion-Exclusion"), 58: (AL, "Searching"), 59: (CO, "Instruction Formats and Branching"), 60: (CO, "Pipelining"),
    61: (CO, "Cache Memory"), 62: (CD, "Register Allocation"), 63: (PD, "Strings in C"), 64: (CO, "Cache Memory"), 65: (PD, "Static Variables"),
}
