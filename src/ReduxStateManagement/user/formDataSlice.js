import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientInfo: null,
  logoAndColor: null,
  website: null,
  email: null,
  dashboard: null,
  account: null,
  packageAndROI: null,
  spotCommission: null,
  levelIncome: null,
  rewardAndAchievers: null,
  royaltyBonus: null,
  closingAndCondition: null,
  fullPlanInDetail: null,
  completedSections: {},
  currentSection: 1
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateClientInfo: (state, action) => {
      state.clientInfo = action.payload;
      state.completedSections[1] = true;
    },
    updateLogoAndColor: (state, action) => {
      state.logoAndColor = action.payload;
      state.completedSections[2] = true;
    },
    updateWebsite: (state, action) => {
      state.website = action.payload;
      state.completedSections[3] = true;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
      state.completedSections[4] = true;
    },
    updateDashboard: (state, action) => {
      state.dashboard = action.payload;
      state.completedSections[5] = true;
    },
    updateAccount: (state, action) => {
      state.account = action.payload;
      state.completedSections[6] = true;
    },
    updatePackageAndROI: (state, action) => {
      state.packageAndROI = action.payload;
      state.completedSections[7] = true;
    },
    updateSpotCommission: (state, action) => {
      state.spotCommission = action.payload;
      state.completedSections[8] = true;
    },
    updateLevelIncome: (state, action) => {
      state.levelIncome = action.payload;
      state.completedSections[9] = true;
    },
    updateRewardAndAchievers: (state, action) => {
      state.rewardAndAchievers = action.payload;
      state.completedSections[10] = true;
    },
    updateRoyaltyBonus: (state, action) => {
      state.royaltyBonus = action.payload;
      state.completedSections[11] = true;
    },
    updateClosingAndCondition: (state, action) => {
      state.closingAndCondition = action.payload;
      state.completedSections[12] = true;
    },
    updateFullPlanInDetail: (state, action) => {
      state.fullPlanInDetail = action.payload;
      state.completedSections[13] = true;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    resetForm: (state) => {
      return initialState;
    }
  }
});

export const {
  updateClientInfo,
  updateLogoAndColor,
  updateWebsite,
  updateEmail,
  updateDashboard,
  updateAccount,
  updatePackageAndROI,
  updateSpotCommission,
  updateLevelIncome,
  updateRewardAndAchievers,
  updateRoyaltyBonus,
  updateClosingAndCondition,
  updateFullPlanInDetail,
  setCurrentSection,
  resetForm
} = formDataSlice.actions;

export default formDataSlice.reducer;