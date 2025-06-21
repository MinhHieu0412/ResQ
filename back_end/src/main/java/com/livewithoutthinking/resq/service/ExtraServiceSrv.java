package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.ExtraService;

import java.util.List;

public interface ExtraServiceSrv {
    ExtraService findExtraSrvByReqResQ(int rrId);
}
