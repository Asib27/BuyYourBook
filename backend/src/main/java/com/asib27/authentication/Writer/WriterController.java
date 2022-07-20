package com.asib27.authentication.Writer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/writer")
public class WriterController {

    @Autowired
    WriterService writerService;

    @PostMapping("/add")
    public String addWriter(@RequestBody Writer writer){
        writerService.addNewWriter(writer);
        return "New writer added!! ";
    }

    @GetMapping("/getWriters")
    public List<Writer> getWriters(){
        return writerService.getWriters();
    }

}

