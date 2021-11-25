import { afiliados } from "../data/afiliados"

export const getAfiliadosByName = (name = '') => {
    if (name === '') {
        return []
    }
    name = name.toLowerCase()
    return afiliados.filter(afiliado => afiliado.nombre.toLowerCase().includes(name));
}