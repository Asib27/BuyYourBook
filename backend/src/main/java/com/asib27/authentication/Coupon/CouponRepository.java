package com.asib27.authentication.Coupon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    @Modifying
    @Query(value = "update coupon set status=?2, discount=?3 where id=?1",nativeQuery = true)
    void updateCoupon(Long couponId, String status, Double discount);

}
