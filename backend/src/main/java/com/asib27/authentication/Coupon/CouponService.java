package com.asib27.authentication.Coupon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CouponService {

    @Autowired
    CouponRepository couponRepository;

    public Coupon addCoupon(Coupon coupon){
        return couponRepository.save(coupon);
    }

    @Transactional
    public void updateCoupon(Long couponId, String status, Double discount) {
         couponRepository.updateCoupon(couponId, status, discount);
    }

    public Coupon getCoupon(Long id){
        return couponRepository.findById(id).get();
    }



    public void deleteCoupon(Long couponId) {
        couponRepository.deleteById(couponId);
    }
}
