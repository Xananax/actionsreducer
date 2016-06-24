
export default function assign<A>(a:A):A;
export default function assign<A,B>(a:A,b:B):A&B;
export default function assign<A,B,C>(a:A,b:B,c:C):A&B&C;
export default function assign<A,B,C,D>(a:A,b:B,c:C,d:D):A&B&C&D;
export default function assign<A,B,C,D,E>(a:A,b:B,c:C,d:D,e:E):A&B&C&D&E;
export default function assign<A,B,C,D,E,F>(a:A,b:B,c:C,d:D,e:E,f:F):A&B&C&D&E&F;
export default function assign<A,B,C,D,E,F,G>(a:A,b:B,c:C,d:D,e:E,f:F,g:G):A&B&C&D&E&F&G;
export default function assign<A,B,C,D,E,F,G,H>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H):A&B&C&D&E&F&G&H;
export default function assign<A,B,C,D,E,F,G,H,I>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I):A&B&C&D&E&F&G&H&I;
export default function assign<A,B,C,D,E,F,G,H,I,J>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J):A&B&C&D&E&F&G&H&I&J;
export default function assign<A,B,C,D,E,F,G,H,I,J,K>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K):A&B&C&D&E&F&G&H&I&J&K;
export default function assign<A,B,C,D,E,F,G,H,I,J,K,L>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K,l:L):A&B&C&D&E&F&G&H&I&J&K&L;
export default function assign<A,B,C,D,E,F,G,H,I,J,K,L,M>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K,l:L,m:M):A&B&C&D&E&F&G&H&I&J&K&L&M;
export default function assign<A,B,C,D,E,F,G,H,I,J,K,L,M,N>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K,l:L,m:M,n:N):A&B&C&D&E&F&G&H&I&J&K&L&M&N;
export default function assign<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K,l:L,m:M,n:N,o:O):A&B&C&D&E&F&G&H&I&J&K&L&M&N&O;
export default function assign<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P>(a:A,b:B,c:C,d:D,e:E,f:F,g:G,h:H,i:I,j:J,k:K,l:L,m:M,n:N,o:O,p:P):A&B&C&D&E&F&G&H&I&J&K&L&M&N&O&P;
/**
 * 
 * ```
 * ({a},...{b})=>{a}&{b}
 * ```
 * 
 * Creates a new object from passed objects.
 * Does not perform any deep copy.
 * @param {...any} objs
 * @returns {Object}
 */
export default function assign<T>(obj:T,...objs):T{
	return Object.assign({},obj,...objs);
}