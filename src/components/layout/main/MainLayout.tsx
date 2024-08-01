import React from "react";
import Navbar from "@/components/layout/main/navbar/Navbar";
import Footer from "@/components/layout/main/footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@/utils/func/notify.scss"

const MainLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return(
        <React.Fragment>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="custom-toast-container" // Classe pour surcharger le style du conteneur
                toastClassName="custom-toast" // Classe pour surcharger le style de chaque toast
                bodyClassName="custom-body"
            />
            <ToastContainer />
        </React.Fragment>
    )
}

export default MainLayout
