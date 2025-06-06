
import Link from "next/link";

export default function NotFound() {
     return (
          <>
               <div style={{ textAlign: "center", padding: "2rem" }}>
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Link href='/'>Go back to Home</Link>
               </div>
          </>
     );
}
