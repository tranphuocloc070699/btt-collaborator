const { getHeaderToken } = require("../utils/token");
const { API, endpoints } = require("../API");

// danh sách nội dung cộng tác
const fetchListCollaborativeContent = (req, res) => {
  const {page,page_size,sort_by,order} = req.query
  try {
    API.get(
        endpoints["fetchListCollaborativeContent"](page,page_size,sort_by,order),
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

// chi tiết nội dung cộng tác
const fetchCollaborativeContentByID = (req, res) => {
    const {id} = req.params
    try {
      API.get(
          endpoints["fetchCollaborativeContentByID"](id),
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

// Tạo nội dung cộng tác
const createCollaborativeContent = (req, res) => {
  try {
    API.post(
        endpoints["createCollaborativeContent"],req.body,
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

//Chỉnh sửa nội dung cộng tác
const updateCollaborativeContent = (req, res) => {
  try {
      const {id} = req.query;

      API.put(
          endpoints["updateCollaborativeContent"](id),req.body,
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

// xóa nội dung cộng tác
const deleteCollaborativeContent = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["deleteCollaborativeContent"](id),
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
    fetchListCollaborativeContent,
    fetchCollaborativeContentByID,
    createCollaborativeContent,
    updateCollaborativeContent,
    deleteCollaborativeContent
};


