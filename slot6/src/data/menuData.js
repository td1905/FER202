import menu1 from '../assets/menu1.jpg';
import menu2 from '../assets/menu2.jpg';
import menu3 from '../assets/menu3.jpg';
import menu4 from '../assets/menu4.jpg';

export const menuList = [
  {
    id: 1,
    name: 'Margherita Pizza',
    oldPrice: '$40.00',
    price: '$24.00',
    badge: 'SALE',
    badgeBg: 'bg-warning text-dark',
    image: menu1,
  },
  {
    id: 2,
    name: 'Mushroom Pizza',
    oldPrice: null,
    price: '$25.00',
    badge: null,
    badgeBg: '',
    image: menu2,
  },
  {
    id: 3,
    name: 'Hawaiian Pizza',
    oldPrice: null,
    price: '$30.00',
    badge: 'NEW',
    badgeBg: 'bg-warning text-dark',
    image: menu3,
  },
  {
    id: 4,
    name: 'Pesto Pizza',
    oldPrice: '$50.00',
    price: '$30.00',
    badge: 'SALE',
    badgeBg: 'bg-warning text-dark',
    image: menu4,
  },
];