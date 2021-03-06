/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { connect } from 'react-redux';
import { DeviceSelector, getAppFile, logger } from 'pc-nrfconnect-shared';

import * as RssiActions from './actions';

const deviceListing = {
    nordicUsb: true,
    serialport: true,
    jlink: true,
};
const deviceSetup = {
    dfu: {
        pca10059: {
            application: getAppFile('fw/rssi-10059.hex'),
            semver: 'rssi_cdc_acm 2.0.0+dfuMay-22-2018-10-43-22',
        },
    },
    jprog: {
        nrf52: {
            fw: getAppFile('fw/rssi-10040.hex'),
            fwVersion: 'rssi-fw-1.0.0',
            fwIdAddress: 0x2000,
        },
    },
    needSerialport: true,
};

const mapState = () => ({
    deviceListing,
    deviceSetup,
});

const mapDispatch = dispatch => ({
    onDeviceSelected: device => { logger.info(`Validating firmware for device with s/n ${device.serialNumber}`); },
    onDeviceDeselected: () => { logger.info('Deselecting device'); dispatch(RssiActions.close()); },
    onDeviceIsReady: device => { logger.info(`Opening device with s/n ${device.serialNumber}`); dispatch(RssiActions.open(device.serialport)); },
});

export default connect(mapState, mapDispatch)(DeviceSelector);
