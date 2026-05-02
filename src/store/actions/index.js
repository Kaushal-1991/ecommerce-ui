import api from "../../api/api";
export const fetchProducts = () => async(dispath) => {
     try {
        const {data} = await api.get(`/public/products`);
        console.log("===========>",data);
        dispath({
            type : "FETCH_PRODUCTS",
            payload : data.content,
            pageNumber : data.pageNumber,
            pageSize : data.pageSize,
            totalPages : data.totalPages,
            lastPage : data.lastPage,
        });
     } catch (error) {
        console.log(error);
     }
};