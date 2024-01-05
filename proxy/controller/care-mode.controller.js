const { getHeaderToken } = require("../utils/token");
const { API, endpoints } = require("../API");

// danh sách chế độ chăm sóc
const fetchListCareMode = (req, res) => {
  const {page,page_size,sort_by,order} = req.query
  try {
    API.get(
        endpoints["fetchListCareMode"](page,page_size,sort_by,order),
        getHeaderToken(req)
      )
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          
          res.send(error);
        });
  } catch (error) {
    return res.send(error);
  }
};

// chi tiết chế độ chăm sóc
const fetchCareModeByID = (req, res) => {
    const {id} = req.params
    try {
      API.get(
          endpoints["fetchCareModeByID"](id),
          getHeaderToken(req)
        )
          .then((response) => {
            res.send(response.data);
          })
          .catch((error) => {
            
            res.send(error);
          });
    } catch (error) {
      return res.send(error);
    }
  };

// Tạo chế độ chăm sóc
const createCareMode = (req, res) => {
  try {
    API.post(
        endpoints["createCareMode"],req.body,
        getHeaderToken(req)
      )
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          res.send(error);
        });
  } catch (error) {
    return res.send(error);
  }
};

//Chỉnh sửa chế độ chăm sóc
const updateCareMode = (req, res) => {
  try {
      const {id} = req.query;

      API.put(
          endpoints["updateCareMode"](id),req.body,
          getHeaderToken(req)
        )
          .then((response) => {
            res.send(response.data);
          })
          .catch((error) => {
            res.send(error);
          });
  } catch (error) {

    return res.send(error);
  }
};

// xóa chế độ chăm sóc
const deleteCareMode = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["deleteCareMode"](id),
          getHeaderToken(req)
        )
          .then((response) => {
            res.send(response.data);
          })
          .catch((error) => {
            
            res.send(error);
          });
    } catch (error) {
      return res.send(error);
    }
  };





module.exports = {
    fetchListCareMode,
    fetchCareModeByID,
    createCareMode,
    updateCareMode,
    deleteCareMode
};


