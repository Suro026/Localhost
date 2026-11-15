def B(s):
    return "".join(c + "̄" if c.isalpha() else c for c in s)

PDS, ALG, TOC, CD, OS, DB, CN, COA, DL, DM, LA, PS = ("Programming and Data Structures","Algorithms","Theory of Computation","Compiler Design",
    "Operating System","Databases","Computer Networks","Computer Organization","Digital Logic","Discrete Mathematics","Linear Algebra","Probability and Statistics")
GA = "General Aptitude"
META = {
 1:(GA,"Verbal Ability: Sentence Completion"),2:(GA,"Verbal Ability: Analogies"),3:(GA,"Numerical Ability: Sequences"),
 4:(GA,"Verbal Ability: Inference"),5:(GA,"Spatial Reasoning: 3-D Surfaces"),6:(GA,"Verbal Ability: Logical Inference"),
 7:(GA,"Numerical Ability: Functions"),8:(GA,"Verbal Ability: Sentence Ordering"),9:(GA,"Numerical Ability: Functions"),
 10:(GA,"Spatial Reasoning: Transformations"),
 11:(CD,"Compiler Phases"),12:(PDS,"Heaps"),13:(PDS,"Linked Lists"),14:(TOC,"DFA to Regular Expression"),15:(DM,"Recurrence Relations"),
 16:(DB,"Relational Model"),17:(CN,"Stop-and-Wait Protocol"),18:(LA,"Determinants"),19:(CD,"Lexical Analysis"),20:(PDS,"Hashing"),
 21:(DL,"Latches"),22:(OS,"Context Switch"),23:(OS,"Mode Switching"),24:(TOC,"Closure Properties"),25:(CN,"OSPF"),
 26:(DM,"Predicate Logic"),27:(OS,"CPU Scheduling"),28:("Calculus","Maxima and Minima"),29:(ALG,"Asymptotic Notation"),
 30:(LA,"Eigenvalues"),31:("Calculus","Multiple Integrals"),32:(COA,"Number Representation"),33:(COA,"Pipelining"),
 34:(COA,"Polling and Interrupts"),35:(PDS,"C Programs"),36:(CD,"Runtime Environment"),37:(CD,"Data Flow Analysis"),
 38:(OS,"Synchronization"),39:(TOC,"Context-Free Grammars"),40:(TOC,"Pushdown Automata"),41:(COA,"Assembly Programs"),
 42:(COA,"Memory Interfacing"),43:(DL,"Sequential Circuits"),44:(DL,"Multiplexers"),45:(COA,"Floating Point"),
 46:(ALG,"Priority Queues"),47:(PDS,"Binary Trees"),48:(DM,"Combinatorics"),49:(DM,"Functions and Equivalence Relations"),
 50:(CN,"TCP Sequence Numbers"),51:(DM,"Group Theory"),52:(CN,"DNS and HTTP"),53:(PS,"Independent Events"),
 54:(ALG,"Asymptotic Analysis"),55:(DM,"Graph Coloring"),56:(ALG,"Graph Traversal"),57:(OS,"Page Replacement"),
 58:(OS,"Multi-level Paging"),59:(PDS,"Stacks and Queues"),60:(CD,"Syntax Directed Translation"),61:(DB,"SQL"),
 62:(DB,"Indexing"),63:(TOC,"DFA Minimization"),64:(COA,"Cache Memory"),65:(CN,"IP Forwarding"),
}
FIG = {10:(7,("rect",92,132,525,245)), 14:(11,("rect",265,140,415,268)), 19:(16,("rect",70,245,410,632)),
       21:(19,("rect",255,145,415,257)), 30:(28,("rect",240,128,372,270)), 36:(35,("rect",85,272,285,636)),
       37:(37,("rect",235,115,440,402)), 40:(41,("rect",270,215,410,372)), 42:(43,("rect",120,175,560,374)),
       43:(45,("rect",120,160,475,299)), 44:(46,("rect",130,165,440,420)), 47:(50,("rect",370,128,505,228)),
       62:(65,("rect",155,180,515,516))}

OV = {
 3:dict(text="A series of natural numbers F₁, F₂, F₃, F₄, F₅, F₆, F₇, … obeys F(n+1) = F(n) + F(n−1) for all integers n ≥ 2. If F₆ = 37 and F₇ = 60, then what is F₁?"),
 7:dict(text="Consider two functions of time t: f(t) = 0.01 t² and g(t) = 4t, where 0 < t < ∞. Now consider the following two statements:\n(i) For some t > 0, g(t) > f(t).\n(ii) There exists a T such that f(t) > g(t) for all t > T.\nWhich one of the following options is TRUE?"),
 8:dict(text="Which one of the following sentence sequences creates a coherent narrative?\n(i) Once on the terrace, on her way to her small room in the corner, she notices the man right away.\n(ii) She begins to pant by the time she has climbed all the stairs.\n(iii) Mina has bought vegetables and rice at the market, so her bags are heavy.\n(iv) He was leaning against the parapet, watching the traffic below."),
 9:dict(text="f(x) and g(y) are functions of x and y, respectively, and f(x) = g(y) for all real values of x and y. Which one of the following options is necessarily TRUE for all x and y?",
        options=["f(x) = 0 and g(y) = 0","f(x) = g(y) = constant","f(x) ≠ constant and g(y) ≠ constant","f(x) + g(y) = f(x) − g(y)"]),
 10:dict(text="Which one of the options best describes the transformation of the 2-dimensional figure P to Q, and then to R, as shown?",
         options=["Operation 1: A clockwise rotation by 90° about an axis perpendicular to the plane of the figure. Operation 2: A reflection along a horizontal line",
                  "Operation 1: A counter clockwise rotation by 90° about an axis perpendicular to the plane of the figure. Operation 2: A reflection along a horizontal line",
                  "Operation 1: A clockwise rotation by 90° about an axis perpendicular to the plane of the figure. Operation 2: A reflection along a vertical line",
                  "Operation 1: A counter clockwise rotation by 180° about an axis perpendicular to the plane of the figure. Operation 2: A reflection along a vertical line"]),
 14:dict(text="Consider the Deterministic Finite-state Automaton (DFA) A shown below (see figure). The DFA runs on the alphabet {0, 1}, and has the set of states {s, p, q, r}, with s being the start state and p being the only final state. Which one of the following regular expressions correctly describes the language accepted by A?",
         options=["1(0*11)*","0(0 + 1)*","1(0 + 11)*","1(110*)*"]),
 15:dict(text="The Lucas sequence Lₙ is defined by the recurrence relation Lₙ = Lₙ₋₁ + Lₙ₋₂ for n ≥ 3, with L₁ = 1 and L₂ = 3. Which one of the options given is TRUE?",
         options=["Lₙ = ((1 + √5)/2)ⁿ + ((1 − √5)/2)ⁿ","Lₙ = ((1 + √5)/2)ⁿ − ((1 − √5)/3)ⁿ","Lₙ = ((1 + √5)/2)ⁿ + ((1 − √5)/3)ⁿ","Lₙ = ((1 + √5)/2)ⁿ − ((1 − √5)/2)ⁿ"]),
 18:dict(text="Let\nA = [[1, 2, 3, 4], [4, 1, 2, 3], [3, 4, 1, 2], [2, 3, 4, 1]]\nand\nB = [[3, 4, 1, 2], [4, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 1]]\n(rows separated by commas). Let det(A) and det(B) denote the determinants of the matrices A and B, respectively. Which one of the options given below is TRUE?"),
 19:dict(text="Consider the following definition of a lexical token id for an identifier in a programming language, using extended regular expressions:\nletter → [A-Za-z]\ndigit → [0-9]\nid → letter (letter | digit)*\nWhich one of the following Non-deterministic Finite-state Automata with ε-transitions accepts the set of valid identifiers? (A double-circle denotes a final state)",
         options=["Automaton (A)","Automaton (B)","Automaton (C)","Automaton (D)"]),
 20:dict(options=["Division method, i.e., use the hash function h(k) = k mod m.","Multiplication method, i.e., use the hash function h(k) = ⌊m(kA − ⌊kA⌋)⌋, where A is a carefully chosen constant.","Universal hashing method.","If k is a prime number, use Division method. Otherwise, use Multiplication method."]),
 21:dict(text="The output of a 2-input multiplexer is connected back to one of its inputs as shown in the figure. Match the functional equivalence of this circuit to one of the following options."),
 25:dict(),
 26:dict(text="Geetha has a conjecture about integers, which is of the form ∀x (P(x) ⟹ ∃y Q(x, y)), where P is a statement about integers, and Q is a statement about pairs of integers. Which of the following (one or more) option(s) would imply Geetha's conjecture?",
         options=["∃x (P(x) ∧ ∀y Q(x, y))","∀x ∀y Q(x, y)","∃y ∀x (P(x) ⟹ Q(x, y))","∃x (P(x) ∧ ∃y Q(x, y))"]),
 28:dict(text="Let f(x) = x³ + 15x² − 33x − 36 be a real-valued function. Which of the following statements is/are TRUE?"),
 29:dict(text="Let f and g be functions of natural numbers given by f(n) = n and g(n) = n². Which of the following statements is/are TRUE?",
         options=["f ∈ O(g)","f ∈ Ω(g)","f ∈ o(g)","f ∈ Θ(g)"]),
 30:dict(text="Let A be the adjacency matrix of the graph with vertices {1, 2, 3, 4, 5} shown in the figure. Let λ₁, λ₂, λ₃, λ₄ and λ₅ be the five eigenvalues of A. Note that these eigenvalues need not be distinct. The value of λ₁ + λ₂ + λ₃ + λ₄ + λ₅ = ______."),
 31:dict(text="The value of the definite integral ∫ from −3 to 3 ∫ from −2 to 2 ∫ from −1 to 1 of (4x²y − z³) dz dy dx is ______. (Rounded off to the nearest integer)"),
 34:dict(text="A keyboard connected to a computer is used at a rate of 1 keystroke per second. The computer system polls the keyboard every 10 ms (milliseconds) to check for a keystroke and consumes 100 μs (microseconds) for each poll. If it is determined after polling that a key has been pressed, the system consumes an additional 200 μs to process the keystroke. Let T₁ denote the fraction of a second spent in polling and processing a keystroke.\nIn an alternative implementation, the system uses interrupts instead of polling. An interrupt is raised for every keystroke. It takes a total of 1 ms for servicing an interrupt and processing a keystroke. Let T₂ denote the fraction of a second spent in servicing the interrupt and processing a keystroke.\nThe ratio T₁/T₂ is ______. (Rounded off to one decimal place)"),
 35:dict(text=r"""The integer value printed by the ANSI-C program given below is ______.
#include<stdio.h>
int funcp(){
    static int x = 1;
    x++;
    return x;
}
int main(){
    int x,y;
    x = funcp();
    y = funcp()+x;
    printf("%d\n", (x+y));
    return 0;
}"""),
 36:dict(text="""Consider the following program:
int main()
{
    f1();
    f2(2);
    f3();
    return(0);
}
int f1()
{
    return(1);
}
int f2(int X)
{
    f3();
    if (X==1)
        return f1();
    else
        return (X*f2(X-1));
}
int f3()
{
    return(5);
}
Which one of the following options represents the activation tree corresponding to the main function?""",
         options=["Tree (A)","Tree (B)","Tree (C)","Tree (D)"]),
 37:dict(text="Consider the control flow graph shown (see figure). Which one of the following choices correctly lists the set of live variables at the exit point of each basic block?"),
 38:dict(text="Consider the two functions incr and decr shown below.\nincr(){\n    wait(s);\n    X = X+1;\n    signal(s);\n}\ndecr(){\n    wait(s);\n    X = X-1;\n    signal(s);\n}\nThere are 5 threads each invoking incr once, and 3 threads each invoking decr once, on the same shared variable X. The initial value of X is 10. Suppose there are two implementations of the semaphore s, as follows:\nI-1: s is a binary semaphore initialized to 1.\nI-2: s is a counting semaphore initialized to 2.\nLet V1, V2 be the values of X at the end of execution of all the threads with implementations I-1, I-2, respectively. Which one of the following choices corresponds to the minimum possible values of V1, V2, respectively?"),
 39:dict(text="Consider the context-free grammar G below\nS → aSb | X\nX → aX | Xb | a | b\nwhere S and X are non-terminals, and a and b are terminal symbols. The starting non-terminal is S. Which one of the following statements is CORRECT?",
         options=["The language generated by G is (a + b)*","The language generated by G is a*(a + b)b*","The language generated by G is a*b*(a + b)","The language generated by G is not a regular language"]),
 40:dict(text="Consider the pushdown automaton (PDA) P below (see figure), which runs on the input alphabet {a, b}, has stack alphabet {⊥, A}, and has three states {s, p, q}, with s being the start state. A transition from state u to state v, labelled c/X/γ, where c is an input symbol or ε, X is a stack symbol, and γ is a string of stack symbols, represents the fact that in state u, the PDA can read c from the input, with X on the top of its stack, pop X from the stack, push in the string γ on the stack, and go to state v. In the initial configuration, the stack has only the symbol ⊥ in it. The PDA accepts by empty stack.\nWhich one of the following options correctly describes the language accepted by P?",
         options=["{aᵐbⁿ | 1 ≤ m and n < m}","{aᵐbⁿ | 0 ≤ n ≤ m}","{aᵐbⁿ | 0 ≤ m and 0 ≤ n}","{aᵐ | 0 ≤ m} ∪ {bⁿ | 0 ≤ n}"]),
 41:dict(text=r"""Consider the given C-code and its corresponding assembly code, with a few operands U1–U4 being unknown. Some useful information as well as the semantics of each unique assembly instruction is annotated as inline comments in the code. The memory is byte-addressable.
//C-code
int a[10], b[10], i;   // int is 32-bit
for (i=0; i<10;i++)
    a[i] = b[i] * 8;

;assembly-code (; indicates comments)
;r1-r5 are 32-bit integer registers
;initialize r1=0, r2=10
;initialize r3, r4 with base address of a, b
L01: jeq r1, r2, end   ;if(r1==r2) goto end
L02: lw  r5, 0(r4)     ;r5 <- Memory[r4+0]
L03: shl r5, r5, U1    ;r5 <- r5 << U1
L04: sw  r5, 0(r3)     ;Memory[r3+0] <- r5
L05: add r3, r3, U2    ;r3 <- r3+U2
L06: add r4, r4, U3
L07: add r1, r1, 1
L08: jmp U4            ;goto U4
L09: end
Which one of the following options is a CORRECT replacement for operands in the position (U1, U2, U3, U4) in the above assembly code?"""),
 42:dict(text="A 4 kilobyte (KB) byte-addressable memory is realized using four 1 KB memory blocks. Two input address lines (IA4 and IA3) are connected to the chip select (CS) port of these memory blocks through a decoder as shown in the figure. The remaining ten input address lines from IA11–IA0 are connected to the address port of these blocks. The chip select (CS) is active high.\nThe input memory addresses (IA11–IA0), in decimal, for the starting locations (Addr=0) of each block (indicated as X1, X2, X3, X4 in the figure) are among the options given below. Which one of the following options is CORRECT?"),
 43:dict(text="Consider a sequential digital circuit consisting of T flip-flops and D flip-flops as shown in the figure. CLKIN is the clock input to the circuit. At the beginning, Q1, Q2 and Q3 have values 0, 1 and 1, respectively.\nWhich one of the given values of (Q1, Q2, Q3) can NEVER be obtained with this digital circuit?"),
 44:dict(text=f"A Boolean digital circuit is composed using two 4-input multiplexers (M1 and M2) and one 2-input multiplexer (M3) as shown in the figure. X0–X7 are the inputs of the multiplexers M1 and M2 and could be connected to either 0 or 1. The select lines of the multiplexers are connected to Boolean variables A, B and C as shown.\nWhich one of the following set of values of (X0, X1, X2, X3, X4, X5, X6, X7) will realise the Boolean function {B('A')} + A.{B('C')} + A.{B('B')}.C?"),
 45:dict(text="Consider the IEEE-754 single precision floating point numbers P=0xC1800000 and Q=0x3F5C2EF4. Which one of the following corresponds to the product of these numbers (i.e., P × Q), represented in the IEEE-754 single precision format?"),
 47:dict(text=r"""Consider the C function foo and the binary tree shown (see figure).
typedef struct node {
    int val;
    struct node *left, *right;
} node;
int foo(node *p) {
    int retval;
    if (p == NULL)
        return 0;
    else {
        retval = p->val + foo(p->left) + foo(p->right);
        printf("%d ", retval);
        return retval;
    }
}
When foo is called with a pointer to the root node of the given binary tree, what will it print?"""),
 48:dict(text="Let U = {1, 2, …, n}, where n is a large positive integer greater than 1000. Let k be a positive integer less than n. Let A, B be subsets of U with |A| = |B| = k and A ∩ B = ∅. We say that a permutation of U separates A from B if one of the following is true.\n- All members of A appear in the permutation before any of the members of B.\n- All members of B appear in the permutation before any of the members of A.\nHow many permutations of U separate A from B?",
         options=["n!","C(n, 2k) · (n − 2k)!","C(n, 2k) · (n − 2k)! · (k!)²","2 · C(n, 2k) · (n − 2k)! · (k!)²"]),
 49:dict(text="Let f : A → B be an onto (or surjective) function, where A and B are nonempty sets. Define an equivalence relation ∼ on the set A as a₁ ∼ a₂ if f(a₁) = f(a₂), where a₁, a₂ ∈ A. Let E = {[x] : x ∈ A} be the set of all the equivalence classes under ∼. Define a new mapping F : E → B as F([x]) = f(x), for all the equivalence classes [x] in E. Which of the following statements is/are TRUE?"),
 51:dict(text="Let X be a set and 2^X denote the powerset of X. Define a binary operation Δ on 2^X as follows: AΔB = (A − B) ∪ (B − A). Let H = (2^X, Δ). Which of the following statements about H is/are correct?",
         options=["H is a group.","Every element in H has an inverse, but H is NOT a group.","For every A ∈ 2^X, the inverse of A is the complement of A.","For every A ∈ 2^X, the inverse of A is A."]),
 54:dict(text="Consider functions Function 1 and Function 2 expressed in pseudocode as follows:\nFunction 1\nwhile n > 1 do\n    for i = 1 to n do\n        x = x + 1;\n    end for\n    n = ⌊n/2⌋;\nend while\nFunction 2\nfor i = 1 to 100 * n do\n    x = x + 1;\nend for\nLet f1(n) and f2(n) denote the number of times the statement \"x = x + 1\" is executed in Function 1 and Function 2, respectively. Which of the following statements is/are TRUE?",
         options=["f1(n) ∈ Θ(f2(n))","f1(n) ∈ o(f2(n))","f1(n) ∈ ω(f2(n))","f1(n) ∈ O(n)"]),
 55:dict(text="Let G be a simple, finite, undirected graph with vertex set {v₁, …, vₙ}. Let Δ(G) denote the maximum degree of G and let N = {1, 2, …} denote the set of all possible colors. Color the vertices of G using the following greedy strategy: for i = 1, …, n: color(vᵢ) ← min{j ∈ N : no neighbour of vᵢ is colored j}. Which of the following statements is/are TRUE?"),
 56:dict(text="Let U = {1, 2, 3}. Let 2^U denote the powerset of U. Consider an undirected graph G whose vertex set is 2^U. For any A, B ∈ 2^U, (A, B) is an edge in G if and only if (i) A ≠ B, and (ii) either A ⊊ B or B ⊊ A. For any vertex A in G, the set of all possible orderings in which the vertices of G can be visited in a Breadth First Search (BFS) starting from A is denoted by B(A). If ∅ denotes the empty set, then the cardinality of B(∅) is ______."),
 57:dict(text=r"""Consider the following two-dimensional array D in the C programming language, which is stored in row-major order:
int D[128][128];
Demand paging is used for allocating memory and each physical page frame holds 512 elements of the array D. The Least Recently Used (LRU) page-replacement policy is used by the operating system. A total of 30 physical page frames are allocated to a process which executes the following code snippet:
for (int i = 0; i < 128; i++)
    for (int j = 0; j < 128; j++)
        D[j][i] *= 10;
The number of page faults generated during the execution of this code snippet is ______."""),
 59:dict(text="Consider a sequence a of elements a0 = 1, a1 = 5, a2 = 7, a3 = 8, a4 = 9, and a5 = 2. The following operations are performed on a stack S and a queue Q, both of which are initially empty.\nI: push the elements of a from a0 to a5 in that order into S.\nII: enqueue the elements of a from a0 to a5 in that order into Q.\nIII: pop an element from S.\nIV: dequeue an element from Q.\nV: pop an element from S.\nVI: dequeue an element from Q.\nVII: dequeue an element from Q and push the same element into S.\nVIII: Repeat operation VII three times.\nIX: pop an element from S.\nX: pop an element from S.\nThe top element of S after executing the above operations is ______."),
 60:dict(text="Consider the syntax directed translation given by the following grammar and semantic rules. Here N, I, F and B are non-terminals. N is the starting non-terminal, and #, 0 and 1 are lexical tokens corresponding to input letters \"#\", \"0\" and \"1\", respectively. X.val denotes the synthesized attribute (a numeric value) associated with a non-terminal X. I1 and F1 denote occurrences of I and F on the right hand side of a production, respectively. For the tokens 0 and 1, 0.val = 0 and 1.val = 1.\nN → I # F      N.val = I.val + F.val\nI → I1 B       I.val = (2 × I1.val) + B.val\nI → B          I.val = B.val\nF → B F1       F.val = ½ (B.val + F1.val)\nF → B          F.val = ½ B.val\nB → 0          B.val = 0.val\nB → 1          B.val = 1.val\nThe value computed by the translation scheme for the input string 10#011 is ______. (Rounded off to three decimal places)"),
 61:dict(text="Consider the following table named Student in a relational database. The primary key of this table is rollNum.\nStudent(rollNum, name, gender, marks):\n1, Naman, M, 62\n2, Aliya, F, 70\n3, Aliya, F, 80\n4, James, M, 82\n5, Swati, F, 65\nThe SQL query below is executed on this database.\nSELECT * FROM Student WHERE gender = 'F' AND marks > 65;\nThe number of rows returned by the query is ______."),
 62:dict(text="Consider a database of fixed-length records, stored as an ordered file. The database has 25,000 records, with each record being 100 bytes, of which the primary key occupies 15 bytes. The data file is block-aligned in that each data record is fully contained within a block. The database is indexed by a primary index file, which is also stored as a block-aligned ordered file. The figure depicts this indexing scheme.\nSuppose the block size of the file system is 1024 bytes, and a pointer to a block occupies 5 bytes. The system uses binary search on the index file to search for a record with a given key. You may assume that a binary search on an index file of b blocks takes ⌈log₂ b⌉ block accesses in the worst case. Given a key, the number of block accesses required to identify the block in the data file that may contain a record with the key, in the worst case, is ______."),
 63:dict(text="Consider the language L over the alphabet {0, 1}, given below:\nL = {w ∈ {0, 1}* | w does not contain three or more consecutive 1's}.\nThe minimum number of states in a Deterministic Finite-State Automaton (DFA) for L is ______."),
 65:dict(text="The forwarding table of a router is shown below.\nSubnet Number | Subnet Mask | Interface ID\n200.150.0.0 | 255.255.0.0 | 1\n200.150.64.0 | 255.255.224.0 | 2\n200.150.68.0 | 255.255.255.0 | 3\n200.150.68.64 | 255.255.255.224 | 4\nDefault | | 0\nA packet addressed to a destination address 200.150.68.118 arrives at the router. It will be forwarded to the interface with ID ______."),
}
