const users = {
    claudio: {
        name: 'Claudio',
        surname: 'Crai',
        account: '0002547698',
        funds: 100000
    }
}

function login() {
    console.log(users.claudio);
    /**
     * <ToDo>
     * Validar usuario utilizando
     * el Token y devolver los
     * datos de dicho usuario
     * </ToDo>
     */
}

export { login };