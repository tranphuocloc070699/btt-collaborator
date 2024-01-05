// CollaborativeField
export const listCollaborativeFieldSelector = (state)=> state.collaborativeField?.partySentimentById
export const collaborativeFieldSelector = (state)=> state.collaborativeField?.partySentimentList

//CollaborativeContent
export const listCollaborativeContentSelector = (state)=> state.collaborativeContent?.partySentimentById
export const collaborativeContentSelector = (state)=> state.collaborativeContent?.partySentimentList

// CareMode
export const listCareModeSelector = (state)=> state.careMode?.listCareMode
export const careModeSelector = (state)=> state.careMode?.careMode

// Collaborator
export const listCollaboratorSelector = (state)=> state.collaborator?.listCollaborator
export const collaboratorSelector = (state)=> state.collaborator?.collaborator

// Loading
export const LoadingSelector = (state)=> state.loading?.loading
// Upload 
export const UploadSelector = (state)=> state.upload.uploadList
