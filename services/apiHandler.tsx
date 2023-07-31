import axios from 'axios';

const baseURL = 'https://quiz-api-agoracom-268026e9ae31.herokuapp.com/api/v1';

const getSuccess = (data: {}, isSuccess = false) => {
    return isSuccess ? {success: true, ...data} : {success: false}
}

export const getClient = async (token: any = null) => {
    if(token) {
        const result = await axios.get(baseURL + `/clients/${token}`);
        return result.status === 200 ? getSuccess(result.data, true) : getSuccess({}, false);
    } else {
        const result = await axios.post(baseURL + '/clients');
        return result.status === 201 ? getSuccess(result.data, true) : getSuccess({}, false);
    }
}

export const getQuestions = async () => {
    const result: any = await axios.get(baseURL + '/questions');
    return result.status === 200 ? {success: true, data: result.data} : getSuccess({}, false);
}

export const updateAnswers = async (payload: {client_id: number, answer_id: any}) => {
    const result: any = await axios.post(baseURL + '/client_answers', payload);
    return result.status === 201 ? {success: true, data: result.data} : getSuccess({}, false);
}

export const getScore = async (token: any) => {
    const result: any = await axios.get(baseURL + `/client_answers/result?client_id=${token}`);
    return result.status === 200 ? {success: true, data: result.data} : getSuccess({}, false);
}