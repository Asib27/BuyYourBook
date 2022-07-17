package com.asib27.authentication.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint{
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException ex)
        throws IOException, ServletException
    {
        logger.error("Unauthorized error: {}", ex.getMessage());
        res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }
}