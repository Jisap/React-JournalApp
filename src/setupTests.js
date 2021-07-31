
import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

//npm install --save-dev @wojtekmaj/enzyme-adapter-react-17


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// const noScroll = () => {};
// Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true});

// import Swal from 'sweetalert2';

jest.mock('sweetalert2', () =>({            // Simulamos sweetalert
    fire: jest.fn(),
    close: jest.fn(),
}));