package com.asib27.authentication.Coupon;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {
    @Autowired
    CouponService couponService;

    @PostMapping("/add")
    public Coupon addCoupon(@RequestBody Coupon coupon){
        return couponService.addCoupon(coupon);
    }

    @PostMapping("/update")
    public void updateCoupon(@RequestParam Long couponId,@RequestParam(defaultValue = "0.0") Double discount, @RequestParam(defaultValue = "invalid") String status
                             ){
        if(couponId == null) return;
         couponService.updateCoupon(couponId, status, discount);
    }

    @DeleteMapping("/remove")
    public void deleteCoupon(@RequestParam Long couponId){
        if(couponId == null) return;
        couponService.deleteCoupon(couponId);
    }
}
