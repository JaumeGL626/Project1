package com.example.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private CustomUserDetailsService customUserDetailsService;

    private JwtService jwtService;

    public JwtAuthorizationFilter(CustomUserDetailsService customUserDetailsService, JwtService jwtService){
        this.jwtService=jwtService;
        this.customUserDetailsService=customUserDetailsService;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException{

        if(SecurityContextHolder.getContext().getAuthentication() == null){
            String authHeader = request.getHeader("Authorization");
            if(authHeader!=null && authHeader.startsWith("Bearer ")){
                String token= authHeader.replace("Bearer ","");
                String username =jwtService.extractUsername(token);

                UserDetails userDetails= customUserDetailsService.loadUserByUsername(username);
                if(jwtService.isTokenValid(token,userDetails)){
                    UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication((authenticationToken));
                }

            }

        }
        filterChain.doFilter(request, response);
    }
}
