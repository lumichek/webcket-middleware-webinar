const BURGER_API_URL = "https://norma.nomoreparties.space/api";
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkResponse(res))
    .then((data: any) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
};