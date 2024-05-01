import { instance, instanceFormData, instanceWithoutBearer, instanceWithoutHeader } from "./instances";
import { errorHandler } from './errorHandler'
export const post_request = async ({ target, body }) => {
    try {
        const response = await instance().post(target, body)
        
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } 
    } catch (error) {
        errorHandler(error)
        return 'Error'
    }
}
export const post_withoutHeader = async ({ target, body }) => {
    try {
        const response = await instanceWithoutHeader().post(target, body)
        
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } 
    } catch (error) {
        errorHandler(error)
        return 'Error'
    }
}

export const get_request = async ({ target, params }) => {
    try {
        const response = await  instance().get(target,{params})
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
            if (response?.status == 200) {
                return response
            }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}
export const get_request_withOutBearer = async ({ target, params }) => {
    try {
        const response = await  instanceWithoutBearer().get(target,{params})
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
            if (response?.status == 200) {
                return response
            }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}

export const get_withoutHeader = async ({ target, params }) => {
    try {
        const response = await instanceWithoutHeader().get(target, {params})
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } else {
            return 'Error'
        }
    } catch (error) {

        errorHandler(error)
        return "Error"
    }
}

export const put_request = async ({ target, body,params = null }) => {

    try {
        const response = await instance(params).put(target, body)
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } else {
            return 'Error'
        }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}

export const put_requestFormData = async ({ target, body,params = null }) => {
    try {
        const response = await instanceFormData(params).put(target, body)
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } else {
            return 'Error'
        }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}

export const delete_request = async ({ target, params }) => {
    try {
        const response = await instance().delete(target, {params})
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } else {
            return 'Error'
        }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}
export const patch_request = async ({ target, body }) => {
    try {
        const response = await instanceFormData().post(target, body)
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
           
            return response
        } else {
            return 'Error'
        }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}

export const patchwithoutType = async ({ target, body }) => {
    try {
        const response = await instance().patch(target, body)
            .catch((e) => {
                errorHandler(e)
                return 'Error'
            })
        if (response?.status == 200) {
            return response
        } else {
            return 'Error'
        }
    } catch (error) {
        errorHandler(error)
        return "Error"
    }
}