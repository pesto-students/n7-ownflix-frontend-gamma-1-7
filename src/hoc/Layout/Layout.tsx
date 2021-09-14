import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Aux from '../Auxiliary/Auxiliary';
import './Layout.scss';

export interface ILayoutProps {
    children: any
}

export default function Layout(props: ILayoutProps) {
    return (
        <div>
            <Aux>
                <Navbar></Navbar>
                <main className='Layout'>{props.children}</main>
                <Footer></Footer>
            </Aux>
        </div>
    );
}
