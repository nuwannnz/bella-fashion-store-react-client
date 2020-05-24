import { loadBanners, loadCategoryBanners, createCategoryBanner, createBanner, deleteBanner, deleteCategoryBanner } from "../../services/banner.service"
import { displayToastAsync } from "./toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../helpers/notification.helper";


export const BANNER_ACTION_TYPES = {
    LOAD_BANNERS: 'LOAD_BANNERS',
    LOAD_CATEGORY_BANNERS: 'LOAD_CATEGORY_BANNERS',
    ADD_BANNER: 'ADD_BANNER',
    ADD_CATEGORY_BANNER: 'ADD_CATEGORY_BANNER',
    DELETE_BANNER: 'DELETE_BANNER',
    DELETE_CATEGORY_BANNER: 'DELETE_CATEGORY_BANNER',

}

export function loadBannersAsync() {
    return async (dispatch) => {
        const result = await loadBanners();

        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.LOAD_BANNERS, payload: result.data });
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to load banners", NOTIFICATION_TYPE.ERROR)))

        }
    }
}

export function loadCategoryBannersAsync() {
    return async (dispatch) => {
        const result = await loadCategoryBanners();

        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.LOAD_CATEGORY_BANNERS, payload: result.data });
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to load category banners", NOTIFICATION_TYPE.ERROR)))

        }
    }
}

export function createCategoryBannerAsync(bannerDto) {
    return async (dispatch, getState) => {
        const { token } = getState().staffLogin.auth;
        const result = await createCategoryBanner(token, bannerDto);


        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.ADD_CATEGORY_BANNER, payload: result.data });
            dispatch(displayToastAsync(buildNotification("Added banner successfully", NOTIFICATION_TYPE.SUCCESS)))
            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to add category banner", NOTIFICATION_TYPE.ERROR)))

        }
    }
}

export function createBannerAsync(bannerDto) {
    return async (dispatch, getState) => {
        const { token } = getState().staffLogin.auth;
        const result = await createBanner(token, bannerDto);


        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.ADD_BANNER, payload: result.data });
            dispatch(displayToastAsync(buildNotification("Added category banner successfully", NOTIFICATION_TYPE.SUCCESS)))
            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to add  banner", NOTIFICATION_TYPE.ERROR)))

        }
    }
}

export function deleteBannerAsync(bannerId) {
    return async (dispatch, getState) => {
        const { token } = getState().staffLogin.auth;
        const result = await deleteBanner(token, bannerId);


        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.DELETE_BANNER, payload: bannerId });
            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to delete  banner", NOTIFICATION_TYPE.ERROR)));
            return false

        }
    }
}

export function deleteCategoryBannerAsync(bannerId) {
    return async (dispatch, getState) => {
        const { token } = getState().staffLogin.auth;
        const result = await deleteCategoryBanner(token, bannerId);


        if (result.isResultOk()) {
            dispatch({ type: BANNER_ACTION_TYPES.DELETE_CATEGORY_BANNER, payload: bannerId });
            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to delete category banner", NOTIFICATION_TYPE.ERROR)))
            return false
        }
    }
}