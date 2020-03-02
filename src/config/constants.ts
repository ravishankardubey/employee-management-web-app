export const LIGHT_THEME = 'Light Theme';
export const DARK_THEME = 'Dark Theme';
export const DEFAULT_THEME = DARK_THEME;
export const THEMES = [LIGHT_THEME, DARK_THEME];


export const LOADER_STATUS = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED'
};


export const URL = {
    EMPLOYEE: '/employee',
    DEPARTMENT: '/department',

    GET_EMPLOYEE: '/getEmployee',
    GET_ALL_EMPLOYEES: '/getAllEmployees',
    ADD_EMPLOYEE: '/addEmployee',
    UPDATE_EMPLOYEE: '/updateEmployee',
    DELETE_EMPLOYEE: '/deleteEmployees',

    GET_DEPARTMENT: '/getDepartment',
    GET_ALL_DEPARTMENTS: '/getAllDepartments',
    ADD_DEPARTMENT: '/addDepartment',
    UPDATE_DEPARTMENT: '/updateDepartment',
    DELETE_DEPARTMENT: '/deleteDepartments'
};

export const ROUTES = {
    home: 'home',
    employee: 'employee',
    department: 'department',
    dashboard: 'dashboard',
};

export const ACTIONS = {
    add: 'add',
    edit: 'edit',
    view: 'view',
    delete: 'delete',
    deleteSelected: 'deleteSelected'
};

export const SNACKBAR_TIME = 3;
