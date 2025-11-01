import Header from "./Header";
import LandingPages from "./LandingPages";
import Layout from "./Layout";
import Service from './Service'
// import { AuthProvider } from './context/AuthContext';


function Dashboard() {

    return (
        <main>
          <h1>
            {/* <AuthProvider> */}
                <Header />
             {/* </AuthProvider>  */}
             </h1> 
            <section>
                <Layout/>
                {/* <Service /> */}
            </section>        
        </main>
    )
}

export default Dashboard;
