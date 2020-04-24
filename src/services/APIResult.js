

export class APIResult {
    constructor() {
        this.status = 200;
        this.data = null;
        this.errorMessage = null;
    }

    isResultOk() {
        return this.status === 200 && this.data !== undefined && this.data !== null;
    }

    setError(error) {
        this.status = error.response ? error.response.status : 500;
        this.errorMessage = error.response ? error.response.data.message : "Something went wrong in our end. Please Try again.";
    }
}