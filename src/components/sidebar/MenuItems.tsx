import { uniqueId } from "lodash";
import { ReactNode } from "react";
import { AiOutlineShop } from "react-icons/ai";

export type SingleNavigationItemProps = {
    id: string;
    title: string;
    href?: string;
    icon?: ReactNode;
    disabled?: boolean;
    externalLink?: boolean;
    onClick?: () => void;
    divider?: boolean;
};

export type NavigationGroupProps = {
    title: string;
    icon?: ReactNode;
    href?: string;
    divider?: boolean;
    children: (SingleNavigationItemProps | NavigationGroupProps)[];
};

type NavigationItem = SingleNavigationItemProps | NavigationGroupProps;

const Menuitems: NavigationItem[] = [
    {
        id: uniqueId(),
        title: "Example",
        icon: <AiOutlineShop />,
        href: "/",
    },

    // -----------REFERENCE FOR MULTI LEVELS---------------
    // {
    //     id: uniqueId(),
    //     title: "Users",
    //     icon: (
    //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path
    //                 d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
    //                 stroke="#4F7B8C"
    //                 stroke-width="2"
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //             />
    //         </svg>
    //     ),
    //     href: "/users/",
    //     children: [
    //         {
    //             id: uniqueId(),
    //             title: "allUsers",
    //             icon: (
    //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path
    //                         d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
    //                         stroke="#667085"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                     />
    //                 </svg>
    //             ),
    //             href: "/users/",
    //         },
    //         {
    //             id: uniqueId(),
    //             title: "ads",
    //             icon: (
    //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path
    //                         d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13"
    //                         stroke="#667085"
    //                         strokeWidth="2"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                     />
    //                 </svg>
    //             ),
    //             href: "/users/ads/",
    //         },
    //     ],
    // },
];

export default Menuitems;

export const FooterBarItem: SingleNavigationItemProps = {
    id: uniqueId(),
    title: "logout",
    icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 16.9998L21 11.9998M21 11.9998L16 6.99982M21 11.9998H9M12 16.9998C12 17.2954 12 17.4432 11.989 17.5712C11.8748 18.9018 10.8949 19.9967 9.58503 20.2571C9.45903 20.2821 9.31202 20.2985 9.01835 20.3311L7.99694 20.4446C6.46248 20.6151 5.69521 20.7003 5.08566 20.5053C4.27293 20.2452 3.60942 19.6513 3.26118 18.8723C3 18.288 3 17.5161 3 15.9721V8.02751C3 6.48358 3 5.71162 3.26118 5.12734C3.60942 4.3483 4.27293 3.75442 5.08566 3.49435C5.69521 3.29929 6.46246 3.38454 7.99694 3.55503L9.01835 3.66852C9.31212 3.70117 9.45901 3.71749 9.58503 3.74254C10.8949 4.00297 11.8748 5.09786 11.989 6.42843C12 6.55645 12 6.70424 12 6.99982"
                stroke="#4F7B8C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
};
