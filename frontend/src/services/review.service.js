const rating_avg = 4.1;
const no_of_review = 100;
const percents = [6, 5, 10, 30, 50];

const getRatingAvg = ()=>{
    return rating_avg;
}

const getNoOfReview = ()=>{
    return no_of_review;
}

const getPercents = ()=>{
    return percents;
}

const reviewService = {
    getRatingAvg, 
    getNoOfReview,
    getPercents
}

export default reviewService;