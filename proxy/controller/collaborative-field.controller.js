const { getHeaderToken } = require("../utils/token");
const { API, endpoints } = require("../API");

// danh sách lĩnh vực cộng tác
const fetchListCollaborativeField = (req, res) => {
  const {page,page_size,sort_by,order} = req.query
  try {
    API.get(
        endpoints["fetchListCollaborativeField"](page,page_size,sort_by,order),
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

// chi tiết lĩnh vực cộng tác
const fetchCollaborativeFieldByID = (req, res) => {
    const {id} = req.params
    try {
      API.get(
          endpoints["fetchCollaborativeFieldByID"](id),
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

// Tạo lĩnh vực cộng tác
const createCollaborativeField = (req, res) => {
  try {
    API.post(
        endpoints["createCollaborativeField"],req.body,
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

//Chỉnh sửa lĩnh vực cộng tác
const updateCollaborativeField = (req, res) => {
  try {
      const {id} = req.query;

      API.put(
          endpoints["updateCollaborativeField"](id),req.body,
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

// xóa lĩnh vực cộng tác
const deleteCollaborativeField = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["deleteCollaborativeField"](id),
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
    fetchListCollaborativeField,
    fetchCollaborativeFieldByID,
    createCollaborativeField,
    updateCollaborativeField,
    deleteCollaborativeField
};


