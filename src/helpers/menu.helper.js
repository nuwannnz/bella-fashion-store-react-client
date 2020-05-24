import { ROUTE_PATHS } from "../constants";


const dashboardMenuItems = [
    {
        index: 0,
        label: 'Users',
        permission: 'user',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_USER,
        icon: 'fas fa-user-friends'
    },
    {
        index: 1,
        label: 'Categories',
        permission: 'category',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_CATEGORY,
        icon: 'fas fa-sitemap'
    },
    {
        index: 2,
        label: 'Products',
        permission: 'product',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_PRODUCT,
        icon: 'fas fa-tshirt'
    },
    {
        index: 3,
        label: 'Orders',
        permission: 'order',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_ORDER,
        icon: 'fas fa-shopping-bag'
    },
    {
        index: 4,
        label: 'Homepage',
        permission: 'user',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_HOMEPAGE,
        icon: 'fas fa-user-alt'
    },
    {
        index: 5,
        label: 'Inquiries',
        permission: 'inquiry',
        link: ROUTE_PATHS.ADIMN_DASHBOARD_INQUIRY,
        icon: 'far fa-question-circle'
    },

]

export const getAdminPanelMenuItems = (userPermissions) => {
    const allowedMenuItems = dashboardMenuItems.filter(item => {
        const permission = userPermissions[item.permission];
        if (permission.read || permission.write) {
            return true;
        }
        return false;
    })
    return allowedMenuItems;
}