import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
  templateCompleted: false,
  activeTab: "about",
  completedTabs: [],
  formData: {
    about: null,
    vision: null,
    mission: null,
    contact: null,
    registration: null,
    login: null,
    welcomeletter: null
  },
  currentStep: "template"
};

export const websiteBuilderSlice = createSlice({
  name: 'websiteBuilder',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setTemplateCompleted: (state, action) => {
      state.templateCompleted = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      const { type, data } = action.payload;
      state.formData[type] = data;
      
      // Add to completed tabs if not already there
      if (!state.completedTabs.includes(type)) {
        state.completedTabs.push(type);
      }
    },
    clearSelectedTemplate: (state) => {
      state.selectedTemplate = null;
    },
    moveToNextSection: (state) => {
      // This moves from website builder to email section
      state.currentStep = "complete";
    },
    resetWebsiteBuilder: () => {
      return initialState;
    }
  }
});

export const {
  setSelectedTemplate,
  setTemplateCompleted,
  setActiveTab,
  setCurrentStep,
  updateFormData,
  clearSelectedTemplate,
  moveToNextSection,
  resetWebsiteBuilder
} = websiteBuilderSlice.actions;

export default websiteBuilderSlice.reducer;