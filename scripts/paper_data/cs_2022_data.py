PDS, ALG, TOC, CD, OS, DB, CN, COA, DL, DM, LA, PS = ("Programming and Data Structures","Algorithms","Theory of Computation","Compiler Design",
    "Operating System","Databases","Computer Networks","Computer Organization","Digital Logic","Discrete Mathematics","Linear Algebra","Probability and Statistics")
GA = "General Aptitude"
META = {
 1:(GA,"Verbal Ability: Word Usage"),2:(GA,"Numerical Ability: Area under a Curve"),3:(GA,"Numerical Ability: Roots of Equations"),
 4:(GA,"Verbal Ability: Logical Statements"),5:(GA,"Spatial Reasoning: Palindromes"),6:(GA,"Verbal Ability: Logical Inference"),
 7:(GA,"Numerical Ability: Percentage Inference"),8:(GA,"Numerical Ability: Probability"),9:(GA,"Spatial Reasoning: Triangle Points"),
 10:(GA,"Spatial Reasoning: Partitioning"),
 11:(ALG,"Asymptotic Notation"),12:(TOC,"DFA to Regular Expression"),13:(CD,"Parsing"),14:(DB,"Normalization"),15:(PDS,"Linked Lists"),
 16:(PDS,"Hashing"),17:(COA,"DMA"),18:(COA,"Number Representation"),19:(OS,"Synchronization"),20:(LA,"Matrices"),
 21:(PDS,"C Programs: Pointers"),22:(CN,"Subnetting"),23:(TOC,"Decidability"),24:(COA,"Cache Write Policies"),25:(DB,"Relational Algebra"),
 26:(OS,"Deadlocks"),27:(DM,"Group Theory"),28:(PDS,"Binary Search Trees"),29:(CD,"LR Parsing"),30:(DM,"Graph Theory"),
 31:(DB,"Functional Dependencies"),32:(DM,"Counting"),33:(COA,"Cache Performance"),34:("Calculus","Limits"),35:(CN,"DNS"),
 36:(DM,"Generating Functions"),37:(DM,"Graph Theory"),38:(OS,"Virtual Memory"),39:(DB,"Serializability"),40:(DL,"Combinational Circuits"),
 41:(COA,"Floating Point"),42:(OS,"CPU Scheduling"),43:(PDS,"C Programs: Arrays"),44:(PDS,"C Programs: Bitwise Operators"),
 45:(LA,"LU Decomposition"),46:(TOC,"Undecidability"),47:(TOC,"Regular and Context-Free Languages"),48:(TOC,"Context-Free Languages"),
 49:(ALG,"Minimum Spanning Trees"),50:(DM,"Graph Theory"),51:(DM,"Recurrence Relations"),52:(DM,"Adjacency Matrix"),53:(LA,"Eigenvectors"),
 54:(COA,"Cache Memory"),55:(CN,"CIDR"),56:(DB,"SQL"),57:(CN,"Distance Vector Routing"),58:(DM,"Spanning Trees"),59:(CN,"Transmission Delay"),
 60:(CN,"TCP Sequence Numbers"),61:(COA,"Pipelining"),62:(PDS,"Queues"),63:(OS,"File Systems"),64:(OS,"Page Replacement"),
 65:(CD,"Syntax Directed Translation"),
}
FIG = {5:(5,("rect",70,120,560,575)), 10:(10,("rect",200,245,540,440)), 12:(11,("rect",225,412,435,552)), 15:(13,("rect",120,108,490,200)),
       22:(18,("rect",135,118,518,320)), 40:(26,("rect",188,172,465,410)), 44:(29,("rect",180,360,470,490)),
       50:(33,("stack",(255,148,395,258),(255,400,395,510))), 56:(38,("rect",130,225,518,376)), 57:(38,("rect",220,580,410,625)),
       62:(40,("rect",180,222,468,350))}

OV = {
 2:dict(text="A function y(x) is defined in the interval [0, 1] on the x-axis as\ny(x) = 2 if 0 ≤ x < 1/3\ny(x) = 3 if 1/3 ≤ x < 3/4\ny(x) = 1 if 3/4 ≤ x ≤ 1\nWhich one of the following is the area under the curve for the interval [0, 1] on the x-axis?",
        options=["5/6","6/5","13/6","6/13"]),
 3:dict(text="Let r be a root of the equation x² + 2x + 6 = 0. Then the value of the expression (r + 2)(r + 3)(r + 4)(r + 5) is"),
 4:dict(text="Given below are four statements.\nStatement 1: All students are inquisitive.\nStatement 2: Some students are inquisitive.\nStatement 3: No student is inquisitive.\nStatement 4: Some students are not inquisitive.\nFrom the given four statements, find the two statements that CANNOT BE TRUE simultaneously, assuming that there is at least one student in the class."),
 5:dict(text="A palindrome is a word that reads the same forwards and backwards. In a game of words, a player has the following two plates painted with letters (see figure, top). From the additional plates given in the options (see figure, options A to D), which one of the combinations of additional plates would allow the player to construct a five-letter palindrome. The player should use all the five plates exactly once. The plates can be rotated in their plane.",
        options=["Plates (A)","Plates (B)","Plates (C)","Plates (D)"]),
 8:dict(text="A box contains five balls of same size and shape. Three of them are green coloured balls and two of them are orange coloured balls. Balls are drawn from the box one at a time. If a green ball is drawn, it is not replaced. If an orange ball is drawn, it is replaced with another orange ball. First ball is drawn. What is the probability of getting an orange ball in the next draw?",
        options=["1/2","8/25","19/50","23/50"]),
 9:dict(text="The corners and mid-points of the sides of a triangle are named using the distinct letters P, Q, R, S, T and U, but not necessarily in the same order. Consider the following statements:\n- The line joining P and R is parallel to the line joining Q and S.\n- P is placed on the side opposite to the corner T.\n- S and U cannot be placed on the same side.\nWhich one of the following statements is correct based on the above information?"),
 10:dict(text="A plot of land must be divided between four families. They want their individual plots to be similar in shape, not necessarily equal in area. The land has equally spaced poles, marked as dots in the figure. Two ropes, R1 and R2, are already present and cannot be moved. What is the least number of additional straight ropes needed to create the desired plots? A single rope can pass through three poles that are aligned in a straight line."),
 11:dict(text="Which one of the following statements is TRUE for all positive functions f(n)?",
         options=["f(n²) = Θ(f(n)²), when f(n) is a polynomial","f(n²) = o(f(n)²)","f(n²) = O(f(n)²), when f(n) is an exponential function","f(n²) = Ω(f(n)²)"]),
 12:dict(text="Which one of the following regular expressions correctly represents the language of the finite automaton given below (see figure)?",
         options=["ab*bab* + ba*aba*","(ab*b)*ab* + (ba*a)*ba*","(ab*b + ba*a)*(a* + b*)","(ba*a + ab*b)*(ab* + ba*)"]),
 13:dict(options=["The LALR(1) parser for a grammar G cannot have reduce-reduce conflict if the LR(1) parser for G does not have reduce-reduce conflict.","Symbol table is accessed only during the lexical analysis phase.","Data flow analysis is necessary for run-time memory management.","LR(1) parsing is sufficient for deterministic context-free languages."]),
 15:dict(text="Consider the problem of reversing a singly linked list. To take an example, given the linked list a → b → c → d → e (see figure, top), the reversed linked list should look like e → d → c → b → a (see figure, bottom). Which one of the following statements is TRUE about the time complexity of algorithms that solve the above problem in O(1) space?",
         options=["The best algorithm for the problem takes Θ(n) time in the worst case.","The best algorithm for the problem takes Θ(n log n) time in the worst case.","The best algorithm for the problem takes Θ(n²) time in the worst case.","It is not possible to reverse a singly linked list in O(1) space."]),
 16:dict(text="Suppose we are given n keys, m hash table slots, and two simple uniform hash functions h₁ and h₂. Further suppose our hashing scheme uses h₁ for the odd keys and h₂ for the even keys. What is the expected number of keys in a slot?",
         options=["m/n","n/m","2n/m","n/(2m)"]),
 19:dict(text="Consider the following threads, T1, T2, and T3 executing on a single processor, synchronized using three binary semaphore variables, S1, S2, and S3, operated upon using standard wait() and signal(). The threads can be context switched in any order and at any time.\nT1: while(true){ wait(S3); print(\"C\"); signal(S2); }\nT2: while(true){ wait(S1); print(\"B\"); signal(S3); }\nT3: while(true){ wait(S2); print(\"A\"); signal(S1); }\nWhich initialization of the semaphores would print the sequence BCABCABCA….?"),
 20:dict(text="Consider the following two statements with respect to the matrices A (m×n), B (n×m), C (n×n) and D (n×n).\nStatement 1: tr(AB) = tr(BA)\nStatement 2: tr(CD) = tr(DC)\nwhere tr() represents the trace of a matrix. Which one of the following holds?"),
 21:dict(text=r"""What is printed by the following ANSI C program?
#include<stdio.h>
int main(int argc, char *argv[])
{
    int x = 1, z[2] = {10, 11};
    int *p = NULL;
    p = &x;
    *p = 10;
    p = &z[1];
    *(&z[0] + 1) += 3;
    printf("%d, %d, %d\n", x, z[0], z[1]);
    return 0;
}"""),
 22:dict(text="Consider an enterprise network with two Ethernet segments, a web server and a firewall, connected via three routers as shown in the figure. What is the number of subnets inside the enterprise network?"),
 23:dict(text="Which of the following statements is/are TRUE?",
         options=["Every subset of a recursively enumerable language is recursive.","If a language L and its complement L̄ are both recursively enumerable, then L must be recursive.","Complement of a context-free language must be recursive.","If L₁ and L₂ are regular, then L₁ ∩ L₂ must be deterministic context-free."]),
 25:dict(text="Consider the following three relations in a relational database: Employee(eId, Name), Brand(bId, bName), Own(eId, bId). Which of the following relational algebra expressions return the set of eIds who own all the brands?",
         options=["π_eId(π_eId,bId(Own) / π_bId(Brand))","π_eId(Own) − π_eId((π_eId(Own) × π_bId(Brand)) − π_eId,bId(Own))","π_eId(π_eId,bId(Own) / π_bId(Own))","π_eId((π_eId(Own) × π_bId(Own)) / π_bId(Brand))"]),
 27:dict(text="Which of the following statements is/are TRUE for a group G?",
         options=["If for all x, y ∈ G, (xy)² = x²y², then G is commutative.","If for all x ∈ G, x² = 1, then G is commutative. Here, 1 is the identity element of G.","If the order of G is 2, then G is commutative.","If G is commutative, then a subgroup of G need not be commutative."]),
 29:dict(text="Consider the augmented grammar with {+, *, (, ), id} as the set of terminals.\nS' → S\nS → S + R | R\nR → R * P | P\nP → (S) | id\nIf I₀ is the set of two LR(0) items {[S' → S.], [S → S. + R]}, then goto(closure(I₀), +) contains exactly ______ items."),
 31:dict(text="Consider a relation R(A, B, C, D, E) with the following three functional dependencies.\nAB → C; BC → D; C → E;\nThe number of superkeys in the relation R is ______."),
 33:dict(text="A cache memory that has a hit rate of 0.8 has an access latency 10 ns and miss penalty 100 ns. An optimization is done on the cache to reduce the miss rate. However, the optimization results in an increase of cache access latency to 15 ns, whereas the miss penalty is not affected. The minimum hit rate (rounded off to two decimal places) needed after the optimization such that it should not increase the average memory access time is ______."),
 34:dict(text="The value of the following limit is ______.\nlim (x → 0⁺) of √x / (1 − e^(2√x))"),
 36:dict(text="Which one of the following is the closed form for the generating function of the sequence {aₙ}, n ≥ 0, defined below?\naₙ = n + 1 if n is odd; aₙ = 1 otherwise",
         options=["x(1 + x²)/(1 − x²)² + 1/(1 − x)","x(3 − x²)/(1 − x²)² + 1/(1 − x)","2x/(1 − x²)² + 1/(1 − x)","x/(1 − x²)² + 1/(1 − x)"]),
 37:dict(text="Consider a simple undirected unweighted graph with at least three vertices. If A is the adjacency matrix of the graph, then the number of 3-cycles in the graph is given by the trace of",
         options=["A³","A³ divided by 2","A³ divided by 3","A³ divided by 6"]),
 39:dict(text="Let Rᵢ(z) and Wᵢ(z) denote read and write operations on a data element z by a transaction Tᵢ, respectively. Consider the schedule S with four transactions.\nS: R₁(x) R₂(x) R₃(x) R₁(y) W₁(y) W₂(x) W₃(y) R₄(y)\nWhich one of the following serial schedules is conflict equivalent to S?",
         options=["T₁ → T₃ → T₄ → T₂","T₁ → T₄ → T₃ → T₂","T₄ → T₁ → T₃ → T₂","T₃ → T₁ → T₄ → T₂"]),
 40:dict(text="Consider a digital display system (DDS) shown in the figure that displays the contents of register X. A 16-bit code word is used to load a word in X, either from S or from R. S is a 1024-word memory segment and R is a 32-word register file. Based on the value of mode bit M, T selects an input word to load in X. P and Q interface with the corresponding bits in the code word to choose the addressed word. Which one of the following represents the functionality of P, Q, and T?",
         options=["P is 10:1 multiplexer; Q is 5:1 multiplexer; T is 2:1 multiplexer","P is 10:2¹⁰ decoder; Q is 5:2⁵ decoder; T is 2:1 encoder","P is 10:2¹⁰ decoder; Q is 5:2⁵ decoder; T is 2:1 multiplexer","P is 1:10 de-multiplexer; Q is 1:5 de-multiplexer; T is 2:1 multiplexer"]),
 41:dict(text="Consider three floating point numbers A, B and C stored in registers R_A, R_B and R_C, respectively as per IEEE-754 single precision floating point format. The 32-bit content stored in these registers (in hexadecimal form) are as follows.\nR_A = 0xC1400000, R_B = 0x42100000, R_C = 0x41400000\nWhich one of the following is FALSE?",
         options=["A + C = 0","C = A + B","B = 3C","(B − C) > 0"]),
 42:dict(text="Consider four processes P, Q, R, and S scheduled on a CPU as per round robin algorithm with a time quantum of 4 units. The processes arrive in the order P, Q, R, S, all at time t = 0. There is exactly one context switch from S to Q, exactly one context switch from R to Q, and exactly two context switches from Q to R. There is no context switch from S to P. Switching to a ready process after the termination of another process is also considered a context switch. Which one of the following is NOT possible as CPU burst time (in time units) of these processes?"),
 43:dict(text=r"""What is printed by the following ANSI C program?
#include<stdio.h>
int main(int argc, char *argv[])
{
    int a[3][3][3] = {{1, 2, 3, 4, 5, 6, 7, 8, 9},
                      {10, 11, 12, 13, 14, 15, 16, 17, 18},
                      {19, 20, 21, 22, 23, 24, 25, 26, 27}};
    int i = 0, j = 0, k = 0;
    for( i = 0; i < 3; i++ ){
        for(k = 0; k < 3; k++ )
            printf("%d ", a[i][j][k]);
        printf("\n");
    }
    return 0;
}""", options=["1 2 3\n10 11 12\n19 20 21","1 4 7\n10 13 16\n19 22 25","1 2 3\n4 5 6\n7 8 9","1 2 3\n13 14 15\n25 26 27"]),
 44:dict(text=r"""What is printed by the following ANSI C program?
#include<stdio.h>
int main(int argc, char *argv[]){
    char a = 'P';
    char b = 'x';
    char c = (a & b) + '*';
    char d = (a | b) - '-';
    char e = (a ^ b) + '+';
    printf("%c %c %c\n", c, d, e);
    return 0;
}
ASCII encoding for relevant characters is given in the figure."""),
 45:dict(text="Consider solving the following system of simultaneous equations using LU decomposition.\nx₁ + x₂ − 2x₃ = 4\nx₁ + 3x₂ − x₃ = 7\n2x₁ + x₂ − 5x₃ = 7\nwhere L and U are denoted as\nL = [[L11, 0, 0], [L21, L22, 0], [L31, L32, L33]],  U = [[U11, U12, U13], [0, U22, U23], [0, 0, U33]]\n(rows separated by commas). Which one of the following is the correct combination of values for L32, U33, and x₁?",
         options=["L32 = 2, U33 = −1/2, x₁ = −1","L32 = 2, U33 = 2, x₁ = −1","L32 = −1/2, U33 = 2, x₁ = 0","L32 = −1/2, U33 = −1/2, x₁ = 0"]),
 46:dict(text="Which of the following is/are undecidable?",
         options=["Given two Turing machines M₁ and M₂, decide if L(M₁) = L(M₂).","Given a Turing machine M, decide if L(M) is regular.","Given a Turing machine M, decide if M accepts all strings.","Given a Turing machine M, decide if M takes more than 10⁷³ steps on every string."]),
 47:dict(text="Consider the following languages:\nL₁ = {aⁿ w aⁿ | w ∈ {a, b}*}\nL₂ = {w x wᴿ | w, x ∈ {a, b}*, |w|, |x| > 0}\nNote that wᴿ is the reversal of the string w. Which of the following is/are TRUE?",
         options=["L₁ and L₂ are regular.","L₁ and L₂ are context-free.","L₁ is regular and L₂ is context-free.","L₁ and L₂ are context-free but not regular."]),
 48:dict(text="Consider the following languages:\nL₁ = {ww | w ∈ {a, b}*}\nL₂ = {aⁿbⁿcᵐ | m, n ≥ 0}\nL₃ = {aᵐbⁿcⁿ | m, n ≥ 0}\nWhich of the following statements is/are FALSE?",
         options=["L₁ is not context-free but L₂ and L₃ are deterministic context-free.","Neither L₁ nor L₂ is context-free.","L₂, L₃ and L₂ ∩ L₃ all are context-free.","Neither L₁ nor its complement is context-free."]),
 49:dict(text="Consider a simple undirected weighted graph G, all of whose edge weights are distinct. Which of the following statements about the minimum spanning trees of G is/are TRUE?",
         options=["The edge with the second smallest weight is always part of any minimum spanning tree of G.","One or both of the edges with the third smallest and the fourth smallest weights are part of any minimum spanning tree of G.","Suppose S ⊆ V be such that S ≠ ∅ and S ≠ V. Consider the edge with the minimum weight such that one of its vertices is in S and the other in V \\ S. Such an edge will always be part of any minimum spanning tree of G.","G can have multiple minimum spanning trees."]),
 50:dict(text="The following simple undirected graph is referred to as the Peterson graph (see figure, top). Which of the following statements is/are TRUE? (The lower part of the figure shows the graph referred to in option C.)",
         options=["The chromatic number of the graph is 3.","The graph has a Hamiltonian path.","The graph shown in the lower part of the figure is isomorphic to the Peterson graph.","The size of the largest independent set of the given graph is 3. (A subset of vertices of a graph form an independent set if no two vertices of the subset are adjacent.)"]),
 51:dict(text="Consider the following recurrence:\nf(1) = 1;\nf(2n) = 2f(n) − 1, for n ≥ 1;\nf(2n + 1) = 2f(n) + 1, for n ≥ 1.\nThen, which of the following statements is/are TRUE?",
         options=["f(2ⁿ − 1) = 2ⁿ − 1","f(2ⁿ) = 1","f(5·2ⁿ) = 2ⁿ⁺¹ + 1","f(2ⁿ + 1) = 2ⁿ + 1"]),
 52:dict(text="Which of the properties hold for the adjacency matrix A of a simple undirected unweighted graph having n vertices?",
         options=["The diagonal entries of A² are the degrees of the vertices of the graph.","If the graph is connected, then none of the entries of Aⁿ⁻¹ + Iₙ can be zero.","If the sum of all the elements of A is at most 2(n − 1), then the graph must be acyclic.","If there is at least a 1 in each of A's rows and columns, then the graph must be connected."]),
 53:dict(text="Which of the following is/are the eigenvector(s) for the matrix given below?\n[[−9, −6, −2, −4], [−8, −6, −3, −1], [20, 15, 8, 5], [32, 21, 7, 12]]\n(rows separated by commas)",
         options=["(−1, 1, 0, 1)ᵀ","(1, 0, −1, 0)ᵀ","(−1, 0, 2, 2)ᵀ","(0, 1, −3, 0)ᵀ"]),
 54:dict(),
 55:dict(text="Consider routing table of an organization's router shown below:\nSubnet Number | Subnet Mask | Next Hop\n12.20.164.0 | 255.255.252.0 | R1\n12.20.170.0 | 255.255.254.0 | R2\n12.20.168.0 | 255.255.254.0 | Interface 0\n12.20.166.0 | 255.255.254.0 | Interface 1\ndefault | | R3\nWhich of the following prefixes in CIDR notation can be collectively used to correctly aggregate all of the subnets in the routing table?"),
 56:dict(text="Consider the relational database with the following four schemas and their respective instances (see figure).\nStudent(sNo, sName, dNo)  Dept(dNo, dName)  Course(cNo, cName, dNo)  Register(sNo, cNo)\nSQL Query:\nSELECT * FROM Student AS S WHERE NOT EXISTS\n  (SELECT cNo FROM Course WHERE dNo = 'D01'\n   EXCEPT\n   SELECT cNo FROM Register WHERE sNo = S.sNo)\nThe number of rows returned by the above SQL query is ______."),
 57:dict(text="Consider a network with three routers P, Q, R shown in the figure (P — Q — R). All the links have cost of unity. The routers exchange distance vector routing information and have converged on the routing tables, after which the link Q−R fails. Assume that P and Q send out routing updates at random times, each at the same average rate. The probability of a routing loop formation (rounded off to one decimal place) between P and Q, leading to count-to-infinity problem, is ______."),
 58:dict(text="Let G(V, E) be a directed graph, where V = {1, 2, 3, 4, 5} is the set of vertices and E is the set of directed edges, as defined by the following adjacency matrix A.\nA[i][j] = 1 if 1 ≤ j ≤ i ≤ 5, and A[i][j] = 0 otherwise.\nA[i][j] = 1 indicates a directed edge from node i to node j. A directed spanning tree of G, rooted at r ∈ V, is defined as a subgraph T of G such that the undirected version of T is a tree, and T contains a directed path from r to every other vertex in V. The number of such directed spanning trees rooted at vertex 5 is ______."),
 59:dict(text="Consider a 100 Mbps link between an earth station (sender) and a satellite (receiver) at an altitude of 2100 km. The signal propagates at a speed of 3×10⁸ m/s. The time taken (in milliseconds, rounded off to two decimal places) for the receiver to completely receive a packet of 1000 bytes transmitted by the sender is ______."),
 62:dict(text="Consider the queues Q₁ containing four elements and Q₂ containing none (shown as the Initial State in the figure). The only operations allowed on these two queues are Enqueue(Q, element) and Dequeue(Q). The minimum number of Enqueue operations on Q₁ required to place the elements of Q₁ in Q₂ in reverse order (shown as the Final State in the figure) without using any additional storage is ______."),
 63:dict(text="Consider two files systems A and B, that use contiguous allocation and linked allocation, respectively. A file of size 100 blocks is already stored in A and also in B. Now, consider inserting a new block in the middle of the file (between 50th and 51st block), whose data is already available in the memory. Assume that there are enough free blocks at the end of the file and that the file control blocks are already in memory. Let the number of disk accesses required to insert a block in the middle of the file in A and B are n_A and n_B, respectively, then the value of n_A + n_B is ______."),
 65:dict(text="Consider the following grammar along with translation rules.\nS → S₁ # T    { S.val = S₁.val * T.val }\nS → T         { S.val = T.val }\nT → T₁ % R    { T.val = T₁.val ÷ R.val }\nT → R         { T.val = R.val }\nR → id        { R.val = id.val }\nHere # and % are operators and id is a token that represents an integer and id.val represents the corresponding integer value. The set of non-terminals is {S, T, R, P} and a subscripted non-terminal indicates an instance of the non-terminal.\nUsing this translation scheme, the computed value of S.val for root of the parse tree for the expression 20#10%5#8%2%2 is ______."),
}
