import axiosClient from "./axiosClient";

const url = "/categories";

export const categoryApi = {
  getAll() {
    return axiosClient.get(url);
  },
  create(body) {
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id, body) {
    return axiosClient.put(`${url}/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`);
  },
};
