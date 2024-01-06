const { getHeaderToken } = require("../utils/token");
const { API, endpoints } = require("../API");



const fetchListCollaborator = (req, res) => {
  const {page,page_size,sort_by,order,full_name,dep_names,pos_names,workplace} = req.query
    let filter = "";
    const array = [{full_name},{dep_names},{pos_names},{workplace}];

    array.forEach((item,index) =>{
        const key = Object.keys(item)[0];
        if(item[key]){
            filter+=`&${key}=${item[key]}`;
        }
    })
  try {
    API.get(
        endpoints["fetchListCollaborator"](page,page_size,sort_by,order,filter),
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


const fetchCollaboratorByID = (req, res) => {
    const {id} = req.params
    try {
      API.get(
          endpoints["fetchCollaboratorByID"](id),
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

const createCollaborator = (req, res) => {
  try {
    const {id} = req.params;
    API.post(
        endpoints["createCollaborator"](id),req.body,
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

const approveCollaborator = (req, res) => {
  try {
    const {id} = req.params;
    API.patch(
        endpoints["approveCollaborator"](id),
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



const updateCollaborator = (req, res) => {
  try {
      const {id} = req.params;

      API.put(
          endpoints["updateCollaborator"](id),req.body,
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


const deleteCollaborator = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["deleteCollaborator"](id),
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


  const fetchDepartmentList = (req, res) => {
    const {dep_name} = req.query
      let filter = "";
      if(dep_name) filter.concat(`?dep_name=${dep_name}`)
    try {
      API.get(
          endpoints["fetchDepartmentList"](filter),
          getHeaderToken(req)
        )
          .then((response) => {
            res.send(response.data);
          })
          .catch((error) => {
            res.send(error);
          });
    } catch (error) {
      console.log({error})
      return res.send(error);
    }
  };

  const fetchPositionlist = (req, res) => {
    const {pos_name} = req.query
      let filter = "";
      if(pos_name) filter.concat(`?pos_name=${pos_name}`)
  
    try {
      API.get(
          endpoints["fetchPositionlist"](filter),
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



const pushToCollaborativeField = (req, res) => {
    try {
      const {id} = req.params;
      API.post(
          endpoints["pushToCollaborativeField"](id),req.body,
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

  const removeFromCollaborativeField = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["removeFromCollaborativeField"](id),
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


const pushToCollaborativeContent = (req, res) => {
    try {
      const {id} = req.params;
      API.post(
          endpoints["pushToCollaborativeContent"](id),req.body,
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

  const removeFromCollaborativeContent = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["removeFromCollaborativeContent"](id),
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


const pushToCareMode = (req, res) => {
    try {
      const {id} = req.params
      ;
      API.post(
          endpoints["pushToCareMode"](id),req.body,
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

  const removeFromCareMode = (req, res) => {
    const {id} = req.params
    try {
      API.delete(
          endpoints["removeFromCareMode"](id),
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
    fetchListCollaborator,
    fetchCollaboratorByID,
    createCollaborator,
    approveCollaborator,
    updateCollaborator,
    deleteCollaborator,
    fetchDepartmentList,
    fetchPositionlist,
    pushToCollaborativeField,
    removeFromCollaborativeField,
    pushToCollaborativeContent,
    removeFromCollaborativeContent,
    pushToCareMode,
    removeFromCareMode
};


