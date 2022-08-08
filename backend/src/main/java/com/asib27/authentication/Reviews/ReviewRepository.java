package com.asib27.authentication.Reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "select avg(rating) from reviews where book_id=?1", nativeQuery = true)
    float getAvgRatingByBookName(Long id);

    @Query(value = "select count (*) " +
            "from reviews where book_id=?1", nativeQuery = true)
    int getReviewCountByBookName(Long id);

    @Query(value = "select T.rating,T.total*100/(select count(*) from reviews where book_id=?1) as percentage " +
            "from(select rating,count(*) as total " +
            "from reviews where book_id=?1 " +
            "group by rating order by rating)as T " +
            "group by T.rating,t.total", nativeQuery = true)
    List<Object[]> getRatingPercentage(Long id);

    @Query(value = "select * from reviews where book_id=?1",nativeQuery = true)
    List<Review> getReviewByBookId(Long book_id);

    @Query(value = "select * from reviews where book_id=?1 order by random() limit ?2", nativeQuery = true)
    List<Review> getRandomReviews(Long id, int no);

    @Query(value = "(select * from reviews where book_id=?1 and rating >3 order by random() limit (?2)/2) union " +
            "(select * from reviews where book_id=?1 and rating <3 order by random() limit ((?2)-(?2)/2))", nativeQuery = true)
    List<Review>getMixedReviews(Long id, int no);
}
